<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/toast/use-toast'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Textarea } from '@/components/ui/textarea'
import { CornerDownLeft, Paperclip, Mic } from 'lucide-vue-next'
import { Badge } from '@/components/ui/badge'
import CameraIcon from '@/assets/camera.svg'

const router = useRouter()
const { toast } = useToast()
const localVideoRef = ref<HTMLVideoElement | null>(null)
const remoteVideoRef = ref<HTMLVideoElement | null>(null)
const mediaStream = ref<MediaStream | null>(null)
const usingroomnumber = ref('')
const isCameraOn = ref(false)
const isRemoteVideoOn = ref(false) // 新增状态变量
let peerConnection: RTCPeerConnection | null = null
let remoteDescriptionSet = false;
const queuedCandidates = []

// 示例聊天消息
const messages = ref([
  { sender: '系统消息', timestamp: 1833028400000, text: '面试即将开始，请双方做好准备！' },
])
const getVariant = (sender: string) => {
  if (sender === '面试官') return 'outline'
  if (sender === '系统消息') return 'secondary'
  return 'default'
}
const newMessage = ref('')
const roleMapping = {
  interviewer: '面试官',
  interviewee: '面试者',
}

const userRole = ref(roleMapping[localStorage.getItem('role')] || '未知角色')
let socket: WebSocket | null = null

// 初始化房间号，从url中的interviewId=tk3xjf 获得
onMounted(() => {
  usingroomnumber.value = getQueryParam('interviewId') || ''
  fetchInterviewMetadata()
  connectWebSocket()
  createPeerConnection() // Initialize peer connection on mount
})

onBeforeUnmount(() => {
  if (socket) {
    socket.close()
  }
})

const connectWebSocket = () => {
  console.log('Connecting to WebSocket...')
  socket = new WebSocket('ws://localhost:8080/chat')

  socket.onopen = () => {
    console.log('WebSocket connection opened')
  }
  // 监听消息事件
  socket.onmessage = async (event) => {
    const messageData = JSON.parse(event.data)
    console.log('WebSocket message received:', messageData)

    if (messageData.type === 'offer') {
      console.log('Received offer:', messageData)
      await handleOffer(messageData)
    } else if (messageData.type === 'answer') {
      console.log('Received answer:', messageData)
      await handleAnswer(messageData)
    } else if (messageData.type === 'candidate') {
      console.log('Received ICE candidate:', messageData)
      await handleCandidate(messageData)
    } else if (messageData.type === 'chat') {
      console.log('Received chat message:', messageData)
      if (messageData.senderName !== userRole.value) {
        messages.value.push({
          sender: messageData.senderName,
          timestamp: new Date(messageData.sendAt).getTime(),
          text: messageData.content,
        })
      }
    }
  }

  socket.onclose = () => {
    console.log('WebSocket connection closed')
  }

  socket.onerror = (error) => {
    console.error('WebSocket error:', error)
  }
}

const createPeerConnection = () => {
  // 创建 RTCPeerConnection 实例，配置 STUN 服务器
  console.log('Creating RTCPeerConnection...')
  peerConnection = new RTCPeerConnection({
    iceServers: [
      { urls: 'stun:172.24.4.159:3478' },
    ],
  })

  // 监听 ICE 候选者事件
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      console.log('ICE Candidate generated:', event.candidate)
      const candidateMessage = {
        type: 'candidate',
        candidate: event.candidate,
      }
      console.log('Sending ICE candidate to remote peer:', candidateMessage)
      socket.send(JSON.stringify(candidateMessage))
    } else {
      console.log('All ICE candidates have been sent')
    }
  }

  // 监听信令状态变化
  peerConnection.onsignalingstatechange = () => {
    console.log('Current signaling state:', peerConnection.signalingState)
  }

  // 监听 ICE 连接状态变化
  peerConnection.oniceconnectionstatechange = () => {
    console.log('ICE connection state changed:', peerConnection.iceConnectionState)
    if (peerConnection.iceConnectionState === 'connected' || peerConnection.iceConnectionState === 'completed') {
      console.log('WebRTC connection established successfully.')
    } else if (peerConnection.iceConnectionState === 'failed') {
      console.error('ICE connection failed. Please check your network and STUN/TURN server configuration.')
    } else if (peerConnection.iceConnectionState === 'disconnected') {
      console.warn('ICE connection disconnected. Attempting to reconnect...')
    } else if (peerConnection.iceConnectionState === 'closed') {
      console.log('ICE connection closed.')
    }
  }

  // 监听远程视频流
  peerConnection.ontrack = (event) => {
    console.log('remoteVideoRef:', remoteVideoRef.value)
    const remotevideoElement = remoteVideoRef.value
    if (remotevideoElement) {
      console.log('Remote track received:', event.streams[0])
      remotevideoElement.srcObject = event.streams[0]
      isRemoteVideoOn.value = true
      remotevideoElement.playsInline = true
      remotevideoElement.play().catch(err => {
        console.error('视频播放错误:', err)
      })
      console.log('Remote video stream set to video element.')
    }
  }
}

const handleOffer = async (message) => {
  console.log('Handling offer:', message)
  if (!peerConnection) {
    // 如果 peerConnection 不存在，则创建一个新的
    createPeerConnection()
  }
  await peerConnection.setRemoteDescription(
    // 设置远程描述
    new RTCSessionDescription({ type: 'offer', sdp: message.sdp })
  )
  // 创建并发送应答
  const answer = await peerConnection.createAnswer()
  // 设置本地描述
  await peerConnection.setLocalDescription(answer)
  console.log('Local description set with answer:', answer)

  const answerMessage = {
    type: 'answer',
    sdp: answer.sdp,
  }

  console.log('Sending answer:', answerMessage)
  socket.send(JSON.stringify(answerMessage))
  console.log('Answer sent.')

}

const handleAnswer = async (message) => {
  console.log('Handling answer:', message)
  if (!peerConnection) {
    console.error('PeerConnection is not initialized.')
    return
  }
  if (peerConnection.signalingState !== 'have-local-offer') {
    console.error('Cannot set remote answer in state:', peerConnection.signalingState)
    return
  }
  // 设置远程描述
  await peerConnection.setRemoteDescription(
    new RTCSessionDescription({ type: 'answer', sdp: message.sdp })
  )
  console.log('Remote description set with answer.')

  // 确保显示远程视频区域
  isCameraOn.value = true
}

// 处理接收到的 ICE 候选者
const handleCandidate = async (message) => {
  console.log('Handling received ICE candidate:', message.candidate)
  try {
    const candidate = new RTCIceCandidate(message.candidate)
    // 如果远程描述已经设置，则直接添加 ICE 候选者
    await peerConnection.addIceCandidate(candidate)
    console.log('ICE candidate added successfully.')
  } catch (error) {
    console.error('Error adding received ICE candidate:', error)
  }
}

const sendMessage = (message, sender) => {
  if (message.trim() !== '') {
    const now = new Date()
    const formattedDate = now.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(/\//g, '-').replace(',', '')

    const messageData = {
      type: 'chat',
      content: message.trim(),
      sendAt: formattedDate,
      senderName: sender
    }

    if (socket) {
      console.log('Sending ' + messageData.type + ' message:', messageData)
      socket.send(JSON.stringify(messageData))
    }

    messages.value.push({
      sender: sender,
      timestamp: Date.now(),
      text: message.trim()
    })
    newMessage.value = '' // 清空输入区域
  }
}

// 开始面试函数
const startInterview = async () => {
  try {
    if (mediaStream.value) {
      mediaStream.value.getTracks().forEach(track => track.stop())
      mediaStream.value = null
      isCameraOn.value = false
    }

    if (!peerConnection || peerConnection.signalingState === 'closed') {
      createPeerConnection()
    }

    mediaStream.value = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    const videoElement = localVideoRef.value
    console.log('localVideoRef:', videoElement)
    if (videoElement) {
      videoElement.srcObject = mediaStream.value
      videoElement.muted = true
      videoElement.playsInline = true
      await videoElement.play().catch(err => {
        console.error('视频播放错误:', err)
      })
    }

    // Add local tracks to peer connection
    mediaStream.value.getTracks().forEach((track) => {
      peerConnection.addTrack(track, mediaStream.value)
    })

    // Create and send offer
    const offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)
    console.log('Local description set with offer:', offer)
    socket.send(JSON.stringify({ type: 'offer', sdp: offer.sdp }))

    isCameraOn.value = true

    toast({
      title: "Success",
      description: "摄像头已开启！",
      variant: "default"
    })
  } catch (error) {
    console.error('无法访问摄像头', error)
    toast({
      title: "Error",
      description: "无法访问摄像头",
      variant: "destructive"
    })
  }
}

// 停止面试函数
const stopInterview = () => {
  try {
    if (mediaStream.value) {
      mediaStream.value.getTracks().forEach(track => track.stop())
      mediaStream.value = null
    }
    if (localVideoRef.value) {
      localVideoRef.value.srcObject = null
    }
    isCameraOn.value = false
    isRemoteVideoOn.value = false // 重置远程视频状态

    if (peerConnection) {
      peerConnection.close()
      peerConnection = null
    }

    toast({
      title: "Success",
      description: "本次面试已结束！",
      variant: "default"
    })
    if (localStorage.getItem('role') === 'interviewer') {
      redirectToInterviewResult(
        getQueryParam('interviewId') || '',
        localStorage.getItem('interviewerId') || ''
      )
    } else {
      router.push('/interviewee?intervieweeId=' + localStorage.getItem('intervieweeId'))
    }
  } catch (error) {
    console.error('无法关闭摄像头', error)
    toast({
      title: "Error",
      description: "无法关闭摄像头",
      variant: "destructive"
    })
  }
}

const redirectToInterviewResult = (interviewId: string, interviewer: string) => {
  const baseUrl = 'http://localhost:5173/result?'
  const url = new URL(baseUrl)
  url.searchParams.append('interviewId', interviewId)
  url.searchParams.append('interviewer', interviewer)

  window.location.href = url.toString()
}

function getQueryParam(param: string) {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(param)
}

const interviewMetadata = ref({
  interviewId: '',
  interviewer: '',
  interviewee: ''
})

function fetchInterviewMetadata() {
  interviewMetadata.value = {
    interviewId: getQueryParam('interviewId'),
    interviewer: getQueryParam('interviewer'),
    interviewee: getQueryParam('interviewee')
  }
}

const handleSubmit = () => {
  sendMessage(newMessage.value, userRole.value)
}
</script>

<template>
  <div class="flex w-full h-screen p-4 gap-4">
    <ResizablePanelGroup
      id="handle-demo-group-1"
      direction="horizontal"
      class="h-full w-full rounded-lg border"
    >
      <!-- Video Panel -->
      <ResizablePanel id="handle-demo-panel-1" :default-size="50">
          <Card class="flex w-full h-full flex-col border-2">
            <CardHeader class="space-y-2 pb-4">
              <div class="flex items-center justify-between">
                <CardTitle class="text-2xl font-bold">视频面试</CardTitle>
                <span class="rounded-full bg-muted px-3 py-1 text-sm">
                  房间号：{{ usingroomnumber }}
                </span>
              </div>
            </CardHeader>
            
            <CardContent class="flex flex-1 flex-col gap-6 p-6 h-full">
              <div class="relative flex-1 overflow-hidden rounded-xl bg-slate-100">
                <div class="flex h-full">
                  <div class="relative h-full w-1/2 bg-gray-300 rounded-xl">
                    <video
                      ref="localVideoRef"
                      autoplay
                      muted
                      playsinline
                      class="h-full w-full rounded-xl object-cover"
                    />
                    <div v-show="!isCameraOn" 
                         class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                         <img :src="CameraIcon" alt="Camera Off" class="h-32 w-32 opacity-40" />
                      <p class="mt-4 text-sm text-muted-foreground">
                        暂未接收到本地视频流
                      </p>
                    </div>
                  </div>
                  <div class="relative h-full w-1/2 bg-gray-300 rounded-xl">
                    <video
                      ref="remoteVideoRef"
                      playsinline
                      class="h-full w-full rounded-xl object-cover"
                    />
                    <div v-show="!isRemoteVideoOn" 
                         class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                         <img :src="CameraIcon" alt="Camera Off" class="h-32 w-32 opacity-40" />
                      <p class="mt-4 text-sm text-muted-foreground">
                        暂未接收到远程视频流
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex gap-4">
                <Button 
                  @click="startInterview"
                  class="flex-1 font-medium"
                  size="lg"
                  :disabled="isCameraOn"
                >
                  开始面试
                </Button>
                
                <Button 
                  @click="stopInterview"
                  variant="destructive"
                  class="flex-1 font-medium"
                  size="lg"
                >
                  结束面试
                </Button>
              </div>
            </CardContent>
          </Card>
      </ResizablePanel>

      <ResizableHandle id="handle-demo-handle-1" with-handle />

      <!-- Chat Panel -->
      <ResizablePanel id="handle-demo-panel-2" :default-size="50">
          <Card class="flex w-full h-full flex-col border-2">
            <CardHeader class="pb-4">
              <CardTitle>对话记录</CardTitle>
            </CardHeader>
            <!-- 消息显示区域 -->
            <div class="flex flex-col h-full">
              <div class="space-y-4">
                <CardContent class="flex flex-1 flex-col gap-4 h-full">
                    <div class="flex-1 overflow-y-auto">
                      <div class="space-y-4 px-2">
                        <div v-for="(message, index) in messages" 
                             :key="index" 
                             class="flex flex-col space-y-1">
                            <div :class="{
                            'text-left': message.sender !== userRole && message.sender !== '系统消息',
                            'text-right': message.sender === userRole && message.sender !== '系统消息',
                            'text-center': message.sender === '系统消息'
                          }">
                          <div class="text-xs text-gray-500">
                            {{ message.sender }} - {{ new Date(message.timestamp).toLocaleString() }}
                          </div>
                            <Badge :variant="getVariant(message.sender)">
                              {{ message.text }}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
              </div>
            </div>
            <!-- 消息输入区域 -->
            <div class="p-4 border-t mt-auto">
              <CardContent class="border-t pt-4">
                    <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">
                      <Textarea
                        v-model="newMessage"
                        placeholder="输入消息，友好交流..."
                        class="min-h-[100px] resize-none rounded-lg border-2 focus:border-primary"
                     />
                      <Button type="submit" class="w-full">
                        发送消息
                        <CornerDownLeft class="ml-2 h-4 w-4" />
                      </Button> 
                    </form>
                  </CardContent>
            </div>
          </Card>
      </ResizablePanel>
    </ResizablePanelGroup>
  </div>
</template>

<style scoped>
:deep(.resizable-handle) {
  width: 4px;
  background-color: #e5e7eb;
  transition: all 0.2s;
}

:deep(.resizable-handle:hover) {
  background-color: #d1d5db;
}

.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.text-center {
  text-align: center;
}
</style>