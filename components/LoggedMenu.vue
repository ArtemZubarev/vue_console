<template>
  <div class="logoutButton">
    <span
      class="logoutButton__text"
      :class="{
        logoutButton_hidden: emailIsHidden,
      }"
    >
      {{ userEmail }}
      <div v-show="emailIsHidden" class="logoutButton__texture" />
    </span>

    <div class="popup">
      <div class="popup__list">
        <button class="popup__item" @click="logout">
          {{ $t("Log out") }}
        </button>
      </div>
    </div>

    <svg-icon
      v-show="!emailIsHidden"
      class="logoutButton__eye"
      name="common/eye-closed"
      @click="toggleShowEmail"
    />

    <svg-icon
      v-show="emailIsHidden"
      class="logoutButton__eye"
      name="common/eye"
      @click="toggleShowEmail"
    />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      emailIsHidden: true
    }
  },
  computed: {
    ...mapGetters({
      userEmail: 'userStore/email'
    })
  },
  methods: {
    toggleShowEmail () {
      this.emailIsHidden = !this.emailIsHidden
    },
    logout () {
      Promise.resolve(this.$store.dispatch('userStore/logout')).then((res) => {
        if (res) {
          this.$store.commit('nodeStore/CLEAR')
          this.$store.commit('nodesStore/CLEAR')
          this.$router.push(this.localePath('/auth'))
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.logoutButton {
  margin: 0;
  padding: 0;
  padding-bottom: 14px;
  max-width: 224px;
  word-break: break-word;
  text-align: left;
  border: none;
  background: transparent;
  getFontSubtitle();
  line-height: 14px;
  getGridIconEl(4px);
  trasition: all 0.15s;
  margin-left: 24px;

  &:focus {
    outline: none;
  }

  &:active {
    color: $colorFontBase;
  }

  +mediaTablet() {
    padding: 10px 0;
    position: relative;
    left: 1px;
    top: 0.5px;
  }

  +mediaDesktop() {
    max-width: 215px;
  }

  +mediaLarge() {
    max-width: 240px;
  }

  +mediaExtraLarge() {
    max-width: 400px;
  }

  &__text {
    position: relative;
    z-index: 1;
    white-space: nowrap;
    top: -3px;
    margin-right: 2px;
    color: $colorFontBase;

    +mediaTablet() {
      max-width: 90px;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    &:hover + .popup {
      opacity: 1;
      z-index: 20;
    }
  }

  &__texture {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    background: url('/blure-texture.svg');
    opacity: 0.5;
    border-radius: 2px;
  }

  &__eye {
    width: 16px;
    height: 16px;
    cursor: pointer;
    color: $colorFontBase;
  }
}

.logoutButton_hidden {
  color: transparent;
}

.popup {
  position: absolute;
  top: 80%;
  right: 0;
  width: max-content;
  min-width: 100%;
  border-radius: 4px;
  transition: all 0.1s;
  color: $colorFontBase;
  user-select: none;

  +mediaTablet() {
    margin-top: -10px;
    padding-top: 10px;
    opacity: 0;
    z-index: -1;

    &:hover {
      opacity: 1;
      z-index: 20;
    }
  }

  &__list {
    background-color: #fff;
    padding: 0;
    width: 100%;
    getFontText();
    line-height: 18px;

    +mediaTablet() {
      padding: 4px 0;
      box-shadow: 0 3px 6px rgba(0, 88, 12, 0.2);
      border-radius: 4px;
    }
  }

  &__item {
    padding: 4px 0 5px;
    width: 100%;
    border: none;
    cursor: pointer;
    text-align: center;
    transition: all 0.1s;
    background-color: #fff;
    text-align: left;

    +mediaTablet() {
      padding: 3px 8px;

      &:hover {
        background-color: $colorSecond;
      }
    }
  }
}
</style>
