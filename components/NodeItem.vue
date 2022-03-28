<template>
  <nuxt-link
    :class="['node', {inProgress: nodeInProgress}]"
    :to="localePath(`/node/${node.id}`)"
    event=""
    @click.native.prevent="handleClick($event, localePath(`/node/${node.id}`))"
  >
    <template v-if="nodeInProgress">
      <div class="node__head">
        <span class="node__title">{{ node.name }}</span>
      </div>
      <div class="progressbar">
        <div
          :class="['progressbar__line']"
          :style="{width: `${(100 / 12) * (node.status ? Number(node.status) + 2 : 1)}%`}"
        />
      </div>
      <p class="step__status">
        {{ statusText ? statusText : 'Preparing...' }}
      </p>
    </template>
    <template v-else>
      <div class="node__head">
        <span class="node__title">{{ node.name }}</span>

        <div class="node__switcher">
          <switcher :enabled="status" @switch="status = !status" />
        </div>
      </div>
      <div class="node__content">
        <div class="node__block">
          <span class="node__block-name">
            {{ $t('Earned in total') }}
          </span>
          <span class="node__block-value">
            {{ node.earned }}
          </span>
        </div>
        <div class="node__block">
          <span class="node__block-name">
            {{ $t('Last block') }}
          </span>
          <span class="node__block-value">
            {{ node.blocks }}
          </span>
        </div>
        <div class="node__block">
          <span class="node__block-name">
            {{ $t('Connected nodes') }}
          </span>
          <span class="node__block-value">
            {{ node.connected }}
          </span>
        </div>
        <div class="node__block">
          <span class="node__block-name">
            {{ $t('Votings') }}
          </span>
          <span class="node__block-value">
            {{ node.votings }}
          </span>
        </div>
      </div>
      <div class="node__footer">
        <div class="node__block small">
          <span class="node__block-name">
            {{ $t('IP') }}
          </span>
          <span class="node__block-value">
            {{ node.ip }}
          </span>
        </div>
        <div class="node__block small">
          <span class="node__block-name">
            {{ $t('Uptime') }}
          </span>
          <span class="node__block-value">
            {{ uptime }}
          </span>
        </div>
        <div class="node__block small">
          <span class="node__block-name">
            {{ $t('Version') }}
          </span>
          <span class="node__block-value">
            {{ node.version }}
          </span>
        </div>
        <div class="node__block small">
          <span class="node__block-name">
            {{ $t('Status') }}
          </span>
          <span
            :class="['node__block-value', {
              danger: node.status === 6 || node.status === 7,
              success: node.status === 5
            } ]"
          >
            {{ $t(statuses[node.status]) }}
          </span>
        </div>
      </div>
      <div v-if="pending" class="loader-box">
        <common-loader :active="pending" />
      </div>
    </template>
  </nuxt-link>
</template>

<script>
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
// import localizedFormat from 'dayjs/plugin/localizedFormat'
import * as dayjs from 'dayjs'
import Switcher from '@/components/Switcher.vue'
import CommonLoader from '@/components/CommonLoader.vue'
import nodeStatuses from '@/utils/nodeStatuses'

dayjs.extend(duration)
dayjs.extend(relativeTime)

const inProgress = (node) => {
  return node.status !== 5 && node.status !== 6 && node.status !== 7
}

export default {
  components: {
    Switcher,
    CommonLoader
  },
  props: {
    node: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      status: true,
      pending: false,
      statuses: nodeStatuses
    }
  },
  computed: {
    uptime () {
      return dayjs.duration(this.node.uptime).humanize()
    },
    nodeInProgress () {
      return inProgress(this.node)
    },
    statusText () {
      return this.statuses[`${this.node.status}`]
    }
  },
  methods: {
    handleClick (e, path) {
      const classNames = e.target.className.split(' ')
      const isSwitcher = classNames.includes('switcher')
      if (this.nodeInProgress) {
        e.preventDefault()
      }
      if (isSwitcher || this.pending) {
        this.pending = true
        setTimeout(() => {
          this.pending = false
        }, 2000)
        e.preventDefault()
      } else {
        this.$router.push(path)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.node {
  position: relative;
  overflow: hidden;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  border-radius: 8px;
  padding: 19px 24px;
  width: 100%;
  max-width: 357px;
  box-sizing: border-box;
  margin-bottom: 24px;

  &.inProgress {
    background: transparent;
    border: 2px solid #fff;
  }

  &:hover {
    cursor: pointer;
  }

  &__content {
    border-top: 2px solid #F7F5EE;
    border-bottom: 2px solid #F7F5EE;
    margin-top: 8px;
    margin-bottom: 10px;
    padding-top: 12px;
    display: flex;
    flex-wrap: wrap;
  }

  &__block-name {
    color: #033354;
    opacity: 0.4;
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
  }

  &__block-value {
    font-size: 24px;
    font-weight: bold;
    margin-top: 4px;

    &.danger {
      color: #EC5D6B;
      font-weight: bold!important;
    }
    &.success {
      color: #7DC475;
      font-weight: bold!important;
    }
  }

  &__block {
    width: 50%;
    display: flex;
    flex-direction: column;
    margin-bottom: 12px;

    &.small {
      margin-bottom: 4px;

      .node__block-name {
        font-size: 14px;
        font-weight: normal;
        text-transform: unset;
      }
      .node__block-value {
        font-size: 14px;
        font-weight: normal;
        margin-top: 0px;
      }
    }
  }

  &__footer {
    display: flex;
    flex-wrap: wrap;
  }

  &__title {
    font-size: 20px;
    font-weight: bold;
  }

  &__head {
    display: flex;
    justify-content: space-between;
  }

  &__switcher {

  }
}
.loader-box {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.progressbar {
  position: relative;
  overflow: hidden;
  background: #fff 0% 0% no-repeat padding-box;
  height: 16px;
  border-radius: 4px;

  &__line {
    position: absolute;
    background: transparent linear-gradient(180deg, #7DC475 0%, #4E9A45 100%) 0% 0% no-repeat padding-box;
    transition: 3s;
    height: 100%;
  }
}
.step {
  &__status {
    opacity: 0.4;
    font-size: 14px;
    margin: 4px 0 0 0;
    margin-bottom: 100px;
  }
}
</style>
