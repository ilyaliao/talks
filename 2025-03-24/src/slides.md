---
highlighter: shiki
css: unocss
colorSchema: dark
transition: fade-out
mdc: true
layout: center
glowSeed: 4
lang: zh-TW
title: 如何參與開源貢獻
---

<h2>如何參與開源貢獻 🤔</h2>

---
src: '../../reuse/intro.zh.md'
---

---
layout: center
---

# 我開始參與開源的故事 {.important-text-5xl}

<!--
首先我想分享一下我自己本身參與開源的過程
-->

---
layout: center
glow: bottom
---

<h2 flex="~ col" text-center mb-4>
  <div text-center flex="~ col gap-2" transition duration-500>
    <span flex="~ gap-x-4 items-center justify-center"text-hex-dddddd transition duration-500 text-1.2em>
      初遇
      <span pb-1.2 text-1.4em font-mono>maru.re</span>
    </span>
  </div>
</h2>

<img v-click src="/antfu-threads-maru-re.png" w-100 rounded-lg shadow forward:delay-400 />

<!--
我最一開始是參與關於「唱歌學日文」複刻的開源專案。 [click]

不知道大家有沒有在脆上看過這個貼文，如果在 vue 圈的話，想必大家都對 Anthony Fu 不陌生，當時他在 Threads 發布了一個貼文

是關於一個叫「唱歌學日文」的網站，然後因為網站關閉了，所以他想複刻一個開源版本

很有趣的是，當時他在 Threads 上招募有興趣的人一起開發，加入的方式是你進入到 discord 後貼上自己的自介，他就會把你邀請進專案中

這是一個難得能跟大神一起開發的機會，所以我當時也第一時間進入到 discord 中
-->

---
layout: center
glow: right
---

<img v-click="0" src="/maru.re-first-pr.png" w-150 mix-blend-plus-lighter />
<Arrow v-click x1="700" y1="100" x2="275" y2="440" text-lime shadow />

<!--
不過當時因為工作的關係，我加入後就是在裡面淺水而已，並沒有參與開發，而是在大概 10 天後，我才開始試著提一些 PR，嘗試做貢獻

當第一個 PR 被合之後，就會增加一些自信，就會有動力去提出第二個、第三個，那後來就是有被邀請成為 maru.re 的團隊成員
-->

---
layout: center
---

# 下一個該挑戰什麼？ {.important-text-5xl}

<!--
有經驗之後，我就開始想下一個要試試看參與哪一個開源專案

然後我後來是挑了我自己日常和工作中經常用到的 VueUse，一方面也是想和托尼有更多合作的機會
-->

---
layout: center
glow: right
---

<h1 m="0 b-2">
  開始<span v-mark.linethrough.red.delay200="{at:1,roughness:6,seed:146}" transition inline-block :class="$clicks >= 1 ? 'op50' : ''"> 貢獻</span> VueUse
</h1>

<div :class="$clicks < 1 ? 'op0' : 'op100'" bold absolute left-64 top-17 text-sm text-red delay-300 duration-500 transition-opacity>瘋狂貢獻</div>

<img v-click src="/vueuse-prs.png" w-160 mix-blend-lighten filter-contrast-120 />

<!--
然後我就開始貢獻 [click]

瘋狂的貢獻
-->

---

<div w-full flex="~ col items-center justify-center gap-y-4">
  <h2 flex="~ col" text-center>
    官方招募維護者
  </h2>
  <img src="/vueuse-help.png" w-75 rounded-md shadow forward:delay-400 hover:scale-105 transition="transform 300" />
</div>

<!--
後來官方在 Bluesky 上發了一個文扒拉扒拉扒拉

在下面留言
-->

---

<img src="/vueuse-join.png"
  w-100 rounded-md mxa shadow forward:delay-400 transition="transform 300" />

<!--
收到來自 Anthony Fu 的邀請，正式加入了 VueUse 的團隊成員！
-->

---
layout: center
---

# 我做了什麼？

<v-clicks>

- 找到自己的第一個貢獻
- 主動爭取
- 堅持並持續貢獻
- 隨時關注最新消息，保持資訊敏感度

</v-clicks>

<!--
那在這個過程中，我想分享幾個我回顧下來蠻重要的幾個點

1. 找到自己的第一個貢獻

當你到一個新的倉庫的同時，你要先找到一個開始點，大家可能覺得貢獻一定是提出某個 PR，但其實貢獻的形式有分為很多種。

2. 主動

你必須要主動去爭取你想要的

一個例子是，當初加入到 maru.re 的 discord 時，裡面的人很多，但實際上有參與開發的人很少

3.堅持並持續貢獻

在上面的過程中，你可能會發現

- PR 沒有被 review
- 很多人搶著貢獻
- 沒有得到回饋

4. 得到第一手消息

我覺得這非常這要，你必須了解到這個倉庫未來可能的走向，可能是透過官方或是作者的發文，或是倉庫的討論串等等，(舉例)，當機會來臨時你才能抓住他
-->

---

# 參與開源專案有什麼好處 🤔

<div grid="~ gap-x-50 gap-y-15 cols-2" pt-20 pb-10 w-max>
  <div v-click flex="~ col gap-1">
    <div text-3xl ml--1 text-blue>認識到很厲害的人</div>
    <div flex="~ items-center gap-x-2" text-base op60 mb1>甚至有機會見面 Meet up 或 Coffee chat  <div text-xl i-ph-coffee-duotone /></div>
  </div>

  <div v-click flex="~ col gap-1">
    <div text-3xl ml--1 text-green>學習協作的技能</div>
    <div flex="~ items-center gap-x-2" text-base op60 mb1>Github workflow <div text-xl i-ph-github-logo-duotone /></div>
  </div>
  
  <div v-click flex="~ col gap-1">
    <div text-3xl ml--1 text-violet>社交能力 Level up</div>
    <div flex="~ items-center gap-x-2" text-base op60 mb1>英文能力大幅提升 <div text-xl i-ph-arrow-fat-line-up-duotone /></div>
  </div>

  <div v-click flex="~ col gap-1">
    <div text-3xl ml--1 text-rose>履歷更好看</div>
    <div flex="~ items-center gap-x-2" text-base op60 mb1>雖然可恥但都是要混口飯吃 <div text-xl i-ph-file-minus-duotone /></div>
  </div>
</div>

<!--
1. Conference 有機會網友見面會，WebConf 見面 antfu! [click]
2. 公司會用到技巧，review pr [click]
3. 大家都用英文，只好學 [click]
4. 恩，可恥
-->

---
glow: right
---

# 該怎麼開始第一步

<div pt3 />

<div font-mono flex="~ col gap-6" py2>
  <div flex="~ gap-2 items-center">
    <div flex="~ gap-2 items-center" v-click>
      <div i-ph-magnifying-glass-fill text-2xl />
      <span font-bold>找到一個你喜歡的倉庫</span>
    </div>
  </div>

  <div flex="~ gap-x-2 items-center" v-click>
    <div flex="~ gap-2 items-center">
      <div i-ph-bug text-2xl />
      <span font-bold>翻看 Issue</span>
    </div>
    <div flex="~ gap-x-2 items-center">
      <span text-hex-c6aaeb bg-hex-7e3dd12e px-1.5 rounded text-sm>pr welcome</span>
      <span text-hex-ecaea8 bg-hex-d73a4a2e px-1.5 rounded text-sm>bug</span>
    </div>
  </div>

  <div flex="~ gap-2 items-center" v-click>
    <div i-ph-git-pull-request-duotone text-2xl />
    <span font-bold>嘗試提交 PRs</span>
  </div>

  <div flex="~ gap-2 items-center" v-click>
    <div i-ph-chat-centered-dots-duotone text-2xl />
    <span font-bold>幫忙回覆 issue</span>
  </div>

  <div flex="~ gap-2 items-center" v-click>
    <div i-ph-eye-duotone text-2xl />
    <span font-bold>幫忙 Review PR</span>
  </div>

  <div flex="~ gap-2 items-center" v-click>
    <div i-ph-lightbulb-filament-duotone text-2xl />
    <span font-bold>發想新功能 or 需求</span>
  </div>
</div>

<!--
1. 平常常用的或是喜歡的大神的新 side project [click]
2. 從倉庫 issue 中找尋出發點，同時也可以了解倉庫歷史 [click]
3. 提交前先參考別人怎麼提交，模板 or 怎麼寫 PR 的描述，怎麼切 [click]
4. 回覆沒人回的 issue，可能是忘了關閉、新功能需求、沒人處理的臭蟲 [click]
5. 幫忙 Review PR，從簡單的到複雜的 (size:S) [click]
6. 想想自己還能做些什麼
-->

---
layout: center
glow: center
class: 'text-center'
---

<h1 important-text-5xl><span transition duration-700 inline-block :class="$clicks === 0 ? 'translate-x-40' : ''">下一步</span> <span forward:delay-400 v-click>開始享受開源</span></h1>

<div text-white:50 text-2xl relative>
  <span v-click>貢獻過程並不是完全為了<span text-blue>「某個目標」</span></span><span v-click>他可以單純是<span text-green>「你想做」</span></span>
</div>

---
layout: center
class: 'text-center'
---

# <b v-click font="mono 800">推薦必看 Podcast</b>

<Youtube v-click id="u6BYW2SBEHg?start=2960" w-150 aspect-ratio-video controls />

<!--
不知道大家是不是已經聽過托尼跟 Mike 老師合作的怕給死，還沒有的話非常推薦大家去聽，每一集多多少少都有講到一些關於開源的知識和內容
那對於有想自己做開源的人，也推薦去看 antfu 的一些 talks 或是 blog，有分享很多他自己做開源時的故事跟經驗。
那我自己是很推薦這集給想要嘗試參與開源的人聽
裡頭講到身為一個開源專案的作者會怎麼去評估一個人能否成為 team member，乾貨滿滿，激推！
-->

---
layout: intro
class: text-center pb-5
glowX: 50
glowY: 120
---

# 謝謝

<!--
那我的分享就到這謝謝大家
-->

<PoweredBySlidev />
