<script setup lang="ts">
import { ref } from 'vue'
import logo from './assets/logo.png'
import { chatSend } from '../api/chat'

const messages = ref<{ from: 'user' | 'bot'; text: string }[]>([])
const input = ref('')
const loading = ref(false)

// 假设有一个 chat 接口，返回 { data: { reply: string } }
interface ChatSendResponse {
  code: number
  data: {
    reply: string
  }
}

async function sendMessage() {
  const text = input.value.trim()
  if (!text) return
  messages.value.push({ from: 'user', text })
  input.value = ''
  loading.value = true
  try {
    // 这里用 fetch 作为示例，请根据实际接口替换
    const res = (await chatSend({ message: text, history: [] })) as ChatSendResponse
    if (res.code === 0) {
      messages.value.push({ from: 'bot', text: res.data.reply || '（无回复）' })
    } else {
      messages.value.push({ from: 'bot', text: '出错了，请重试。' })
    }
  } catch {
    messages.value.push({ from: 'bot', text: '出错了，请重试。' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <div class="title"><img :src="logo" alt="logo" class="logo" />今天有什么可以帮你？</div>
    <div class="chat-container">
      <div class="chat-header">
        <span class="chat-title">AI智能工具</span>
      </div>
      <div class="chat-messages" ref="msgBox">
        <div v-for="(msg, idx) in messages" :key="idx" :class="['chat-message', msg.from]">
          <span>{{ msg.text }}</span>
        </div>
        <div v-if="loading" class="chat-message bot loading">
          <span>正在思考...</span>
        </div>
      </div>
      <form class="chat-input-bar" @submit.prevent="sendMessage">
        <input
          v-model="input"
          :disabled="loading"
          type="text"
          placeholder="请向我提问…"
          autocomplete="off"
          @keydown.enter.exact.prevent="sendMessage"
        />
        <button :disabled="loading || !input.trim()" type="submit">发送</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 2em;
  vertical-align: middle;
  margin-right: 8px;
  margin-top: -4px;
}
.title {
  width: 80%;
  margin: 20px auto;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  color: #222;
}
.chat-container {
  width: 75%;
  margin: 10px auto 60px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 32px 0 rgba(0, 47, 167, 0.12);
  display: flex;
  flex-direction: column;
  min-height: 400px;
  overflow: hidden;
  font-family: 'Inter', 'PingFang SC', 'Helvetica Neue', Arial, sans-serif;
  border: 1px solid rgba(0, 47, 167, 0.08);
}

.chat-header {
  padding: 24px 32px 16px 32px;
  background: linear-gradient(135deg, #002fa7 0%, #0041c2 100%);
  color: #fff;
  font-size: 1.3rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.chat-title {
  user-select: none;
}

.chat-messages {
  flex: 1;
  height: 400px;
  padding: 24px 24px 0 24px;
  overflow-y: auto;
  background: #f7f9fb;
  display: flex;
  flex-direction: column;
}

.chat-message {
  max-width: 80%;
  padding: 12px 18px;
  border-radius: 16px;
  font-size: 1rem;
  line-height: 1.6;
  word-break: break-word;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.03);
  transition: background 0.2s;
}

.chat-message.user {
  align-self: flex-end;
  background: linear-gradient(135deg, #ccd9ff 0%, #b3c7ff 100%);
  color: #001a5c;
}

.chat-message.bot {
  align-self: flex-start;
  background: #fff;
  color: #002fa7;
  border: 1px solid #b3c7ff;
}

.chat-message.loading {
  opacity: 0.7;
  font-style: italic;
}

.chat-input-bar {
  display: flex;
  gap: 12px;
  padding: 18px 24px 24px 24px;
  background: #fff;
  border-top: 1px solid #f0f2f5;
}

.chat-input-bar input {
  flex: 1;
  border: none;
  outline: none;
  background: #f7f9fb;
  border-radius: 12px;
  padding: 12px 16px;
  font-size: 1rem;
  transition:
    box-shadow 0.2s,
    border 0.2s;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.03);
  border: 1px solid transparent;
}

.chat-input-bar input:focus {
  border-color: #002fa7;
  box-shadow: 0 2px 8px 0 rgba(0, 47, 167, 0.15);
}

.chat-input-bar input:disabled {
  background: #f0f2f5;
}

.chat-input-bar button {
  background: linear-gradient(135deg, #002fa7 0%, #0041c2 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 0 22px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition:
    background 0.2s,
    opacity 0.2s;
  opacity: 1;
}

.chat-input-bar button:hover:not(:disabled) {
  background: linear-gradient(135deg, #001f7a 0%, #002d94 100%);
  box-shadow: 0 4px 12px rgba(0, 47, 167, 0.3);
}

.chat-input-bar button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
