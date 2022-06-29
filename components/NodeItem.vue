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
      <div class="node__installing">
        {{ $t('Installing a Node. It will take some time.') }}
      </div>
      <div class="progressbar">
        <div
          :class="['progressbar__line']"
          :style="{width: `${(blocks / blocksMain) * (100)}%`}"
        />
      </div>
      <p class="step__status">
        <span>

          {{ blocks ? blocks : 0 }} {{ $t('packages installed') }}
        </span>
        <br>
        <b>

          {{ $t(statusText) }}
        </b>
      </p>
      <p class="node__setup-notice">
        {{ $t('Installing may take a long time, you can close the browser window and reopen it later') }}
      </p>
    </template>
    <template v-else>
      <div class="node__head">
        <span class="node__title">{{ node.name }}</span>

        <div class="node__switcher">
          <!-- <switcher :enabled="status" @switch="status = !status" /> -->
        </div>
      </div>
      <div class="node__content">
        <div class="node__block">
          <div class="node__block-name">
            {{ $t('Earned in total') }}
          </div>
          <div class="node__block-value">
            <common-loader
              v-if="reward === 'pending'"
              class="loader"
              :active="true"
              :spinnerSize="20"
              :centered="false"
            />
            <span v-else-if="reward === 'failed'">0</span>
            <span v-else>{{ reward }}</span>
          </div>
        </div>
        <div class="node__block">
          <div class="node__block-name">
            {{ $t('Last block') }}
          </div>
          <div class="node__block-value">
            {{ node.blocks }}
          </div>
        </div>
        <div class="node__block">
          <div class="node__block-name">
            {{ $t('Connected nodes') }}
          </div>
          <div class="node__block-value">
            {{ node.connected }}
          </div>
        </div>
        <div class="node__block">
          <div class="node__block-name">
            {{ $t('Votings') }}
          </div>
          <div class="node__block-value">
            <common-loader
              v-if="votings === 'pending'"
              class="loader"
              :active="true"
              :spinnerSize="20"
              :centered="false"
            />
            <span v-else-if="votings === 'failed'">0</span>
            <span v-else>{{ votings }}</span>
          </div>
        </div>
      </div>
      <div class="node__footer">
        <div class="node__block small">
          <div class="node__block-name">
            {{ $t('IP') }}
          </div>
          <div class="node__block-value">
            {{ node.ip }}
          </div>
        </div>
        <div class="node__block small">
          <div class="node__block-name">
            {{ $t('Uptime') }}
          </div>
          <div class="node__block-value">
            {{ uptime }}
          </div>
        </div>
        <div class="node__block small">
          <div class="node__block-name">
            {{ $t('Version') }}
          </div>
          <div class="node__block-value">
            {{ node.version }}
          </div>
        </div>
        <div class="node__block small">
          <div class="node__block-name">
            {{ $t('Status') }}
          </div>
          <div
            :class="['node__block-value', {
              danger: node.status === 6 || node.status === 7,
              success: node.status === 5
            } ]"
          >
            {{ $t(statuses[node.status]) }}
          </div>
        </div>
      </div>
      <!-- <div v-if="pending" class="loader-box">
        <common-loader :active="pending" />
      </div> -->
    </template>
  </nuxt-link>
</template>

<script>
import { mapGetters } from 'vuex'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import * as dayjs from 'dayjs'
import nodeStatuses from '@/utils/nodeStatuses'
import locales from '@/utils/uptimeLocales'
import formatUptime from '@/utils/formatUptime'

dayjs.extend(duration)
dayjs.extend(relativeTime)

const inProgress = (node) => {
  return node.status !== 5 && node.status !== 6 && node.status !== 7
}

export default {
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
    ...mapGetters({
      rewards: 'rewardsStore/rewards'
    }),
    uptime () {
      dayjs.locale(this.$i18n.locale)
      const now = dayjs()
      const uptime = dayjs.unix(this.node.uptime ? this.node.uptime : now)
      // eslint-disable-next-line
      const dur = dayjs.duration(now.diff(uptime))
      const l = this.$i18n.locale
      const loc = locales

      return formatUptime(dur, loc[l])
    },
    nodeInProgress () {
      return inProgress(this.node)
    },
    statusText () {
      return this.statuses[`${this.node.status}`]
    },
    blocks () {
      return this.node.blocks ?? 0
    },
    blocksMain () {
      return this.node.blocksMain ?? 0
    },
    reward () {
      const reward = this.rewards[this.node.address]
      if (reward) {
        if (reward.status === 'fetched') {
          return reward.data.oton.amount
        } else if (reward.status === 'failed') {
          return 'failed'
        }
        return 'failed'
      } else {
        return 'pending'
      }
    },
    votings () {
      const reward = this.rewards[this.node.address]
      if (reward) {
        if (reward.status === 'fetched') {
          return reward.data.oton.transactions
        } else if (reward.status === 'failed') {
          return 'failed'
        }
        return 'failed'
      } else {
        return 'pending'
      }
    }
  },
  methods: {
    handleClick (e, path) {
      const classNames = e.target.className.split(' ')
      const isSwitcher = classNames.includes('switcher')
      if (this.nodeInProgress) {
        e.preventDefault()
        return
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

  &__installing {
    font-size: 14px;
    margin-top: 50px;
    text-align: center;

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
    position: relative;
    font-size: 24px;
    font-weight: bold;
    margin-top: 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    height: 100%;

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
    box-sizing: border-box;

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

  &__setup-notice {
    position: absolute;
    font-size: 13px;
    opacity: 0.6;
    width: 100%;
    background: #fff;
    bottom: 0;
    left: 0;
    padding: 8px 24px;
    margin: 0;
    box-sizing: border-box;
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
  margin-top: 20px;

  &__line {
    position: absolute;
    background: transparent linear-gradient(180deg, #7DC475 0%, #4E9A45 100%) 0% 0% no-repeat padding-box;
    transition: 4s;
    height: 100%;
  }
}
.step {
  &__status {
    opacity: 0.4;
    font-size: 13px;
    margin: 4px 0 0 0;
    margin-bottom: 80px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
