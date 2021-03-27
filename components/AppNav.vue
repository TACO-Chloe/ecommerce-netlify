<template>
  <header>
    <h1>E-Commerce</h1>
    <nav>
		<van-grid column-num="5" :border=false>
				<nuxt-link exact to="/"><van-grid-item icon="wap-home" text="HOME"  dot/></nuxt-link>
				<nuxt-link to="/all"><van-grid-item icon="hot" text="HOT" /></nuxt-link>
				<nuxt-link to="/goods"><van-grid-item icon="new" text="NEW" /></nuxt-link>
				<nuxt-link to="/mycart"><van-grid-item icon="shop" text="SHOP" /></nuxt-link>
				<!--<div class="carttotal" v-if="cartCount > 0">{{ cartCount }}</div>-->
				<nuxt-link to="/cart"><van-grid-item icon="cart" text="CART" :badge="cartCount" /></nuxt-link>
		</van-grid>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["cartCount"])
  }
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 40px 40px 0;
}

nav {
  display: flex;
  width: 80vw;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  padding: 8px 0;
  ul {
    padding-left: 0;
    li {
      display: inline;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-size: 13px;
      padding: 0 20px;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      position: relative;
      a {
        color: black;
        &:hover {
          color: #c14103;
        }
      }
    }
  }
}

.van-grid {
	flex-wrap: nowrap;
	a {
		color: black;
		&:hover {
		  color: #c14103;
		}
	}
}

.van-icon {
  font-size: 25px;
}

.carttotal {
  position: absolute;
  border-radius: 1000px;
  background: black;
  color: white;
  font-size: 10px;
  padding: 3px;
  top: -18px;
  right: -5px;
  width: 25px;
  text-align: center;
  height: 25px;
  font-size: 10px;
  padding: 6px 10px;
  font-weight: bold;
}



@media screen and (max-width: 850px) {
  h1 {
    margin: 0;
  }
  nav ul li {
    padding: 0 5px !important;
    border-left: none !important;
    border-right: none !important;
  }
}
</style>
