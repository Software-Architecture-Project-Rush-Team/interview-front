<script setup lang="ts">
import { ref } from 'vue'
import Header from '@/components/header.vue'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// 面试结果数据
const interviewResult = ref({
  jobTitle: '公务员职位A123', 
  interviewDate: '2024-03-15',
  scores: {
    languageExpression: 18,
    logicalThinking: 16,
    situationalResponse: 17,
    professionalKnowledge: 15,
    personalQuality: 16,
    total: 82
  },
  status: 'passed', // 'passed' | 'failed' | 'pending'
  rank: 3, // 排名
  comments: '表现优秀，具备良好的沟通能力和专业素养',
  hiringDecision: 'accepted' // 'accepted' | 'rejected' | 'pending'
})
</script>

<template>
  <div class="app-container">
    <!-- <Header /> -->
    <div class="content-container">
      <Card class="result-card">
        <CardHeader>
          <CardTitle class="text-2xl">面试结果公示</CardTitle>
          <CardDescription>
            应聘职位：{{ interviewResult.jobTitle }}
            <br/>
            面试日期：{{ interviewResult.interviewDate }}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <!-- 状态展示 -->
          <div class="status-section">
            <Badge :variant="interviewResult.status === 'passed' ? 'default' : 'destructive'">
              {{ interviewResult.status === 'passed' ? '面试通过' : '未通过' }}
            </Badge>
            <Badge variant="outline">
              排名: {{ interviewResult.rank }}
            </Badge>
            <Badge :variant="interviewResult.hiringDecision === 'accepted' ? 'default' : 'destructive'">
              {{ interviewResult.hiringDecision === 'accepted' ? '录用' : '未录用' }}
            </Badge>
          </div>

          <!-- 分数详情 -->
          <div class="scores-section">
            <h3 class="text-lg font-semibold mb-4">详细得分</h3>
            <div class="score-grid">
              <div class="score-item">
                <label>语言表达</label>
                <div class="score">{{ interviewResult.scores.languageExpression }}/20</div>
              </div>
              <div class="score-item">
                <label>逻辑思维</label>
                <div class="score">{{ interviewResult.scores.logicalThinking }}/20</div>
              </div>
              <div class="score-item">
                <label>情景应变</label>
                <div class="score">{{ interviewResult.scores.situationalResponse }}/20</div>
              </div>
              <div class="score-item">
                <label>专业知识</label>
                <div class="score">{{ interviewResult.scores.professionalKnowledge }}/20</div>
              </div>
              <div class="score-item">
                <label>个人素质</label>
                <div class="score">{{ interviewResult.scores.personalQuality }}/20</div>
              </div>
            </div>
            
            <div class="total-score">
              <label>总分</label>
              <div class="score">{{ interviewResult.scores.total }}/100</div>
            </div>
          </div>

          <!-- 评语 -->
          <div class="comments-section">
            <h3 class="text-lg font-semibold mb-2">面试评语</h3>
            <p class="text-gray-600">{{ interviewResult.comments }}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh; /* Keep this to ensure minimum full height */
  width: 100vw; /* Take full viewport width */
  background-color: #f5f5f5;
  padding: 40px 80px; /* Wider padding for desktop */
  margin: 0; /* Remove any default margins */
  box-sizing: border-box; /* Include padding in width calculation */
  display: flex; /* Enable flex layout */
  flex-direction: column; /* Stack children vertically */
  overflow-x: hidden; /* Prevent horizontal scrollbar */
}

.content-container {
  flex: 1; /* Take remaining vertical space */
  width: 100%;
  max-width: 1200px; /* Wider max-width for desktop */
  margin: 0 auto;
  padding: 32px;
}

.result-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.status-section {
  display: flex;
  gap: 16px;
  margin: 24px 0;
  justify-content: flex-start;
}

.scores-section {
  margin: 32px 0;
}

.score-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.score-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background-color: #f8f9fa;
  border-radius: 6px;
  min-height: 64px;
}

.score-item label {
  font-size: 15px;
  font-weight: 500;
  color: #374151;
}

.score {
  font-size: 16px;
  font-weight: 600;
  color: #2563eb;
}

.total-score {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  background-color: #eef2ff;
  border-radius: 6px;
  margin-top: 24px;
}

.total-score label {
  font-size: 16px;
  font-weight: 600;
}

.total-score .score {
  font-size: 20px;
  color: #1e40af;
}

.comments-section {
  margin-top: 32px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 6px;
}

@media (max-width: 1200px) {
  .content-container {
    max-width: 900px;
  }
}

@media (max-width: 992px) {
  .content-container {
    max-width: 100%;
    padding: 24px;
  }
  .score-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .score-grid {
    grid-template-columns: 1fr;
  }
  .content-container {
    padding: 16px;
  }
  .app-container {
    padding: 16px;
  }
}
</style>