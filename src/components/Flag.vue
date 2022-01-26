<script lang="ts" setup>
import defaultIcon from '@/assets/flags/default.svg?raw'
import tryIcon from '@/assets/flags/try.svg?raw'
import aed from '@/assets/flags/aed.svg?raw'
import ars from '@/assets/flags/ars.svg?raw'
import aud from '@/assets/flags/aud.svg?raw'
import bdt from '@/assets/flags/bdt.svg?raw'
import bhd from '@/assets/flags/bhd.svg?raw'
import bmd from '@/assets/flags/bmd.svg?raw'
import brl from '@/assets/flags/brl.svg?raw'
import btc from '@/assets/flags/btc.svg?raw'
import cad from '@/assets/flags/cad.svg?raw'
import chf from '@/assets/flags/chf.svg?raw'
import clp from '@/assets/flags/clp.svg?raw'
import cny from '@/assets/flags/cny.svg?raw'
import czk from '@/assets/flags/czk.svg?raw'
import dkk from '@/assets/flags/dkk.svg?raw'
import eur from '@/assets/flags/eur.svg?raw'
import gbp from '@/assets/flags/gbp.svg?raw'
import hkd from '@/assets/flags/hkd.svg?raw'
import huf from '@/assets/flags/huf.svg?raw'
import idr from '@/assets/flags/idr.svg?raw'
import ils from '@/assets/flags/ils.svg?raw'
import inr from '@/assets/flags/inr.svg?raw'
import jpy from '@/assets/flags/jpy.svg?raw'
import krw from '@/assets/flags/krw.svg?raw'
import kwd from '@/assets/flags/kwd.svg?raw'
import lkr from '@/assets/flags/lkr.svg?raw'
import mmk from '@/assets/flags/mmk.svg?raw'
import mxn from '@/assets/flags/mxn.svg?raw'
import myr from '@/assets/flags/myr.svg?raw'
import ngn from '@/assets/flags/ngn.svg?raw'
import nok from '@/assets/flags/nok.svg?raw'
import nzd from '@/assets/flags/nzd.svg?raw'
import php from '@/assets/flags/php.svg?raw'
import pkr from '@/assets/flags/pkr.svg?raw'
import pln from '@/assets/flags/pln.svg?raw'
import rub from '@/assets/flags/rub.svg?raw'
import sar from '@/assets/flags/sar.svg?raw'
import sek from '@/assets/flags/sek.svg?raw'
import sgd from '@/assets/flags/sgd.svg?raw'
import thb from '@/assets/flags/thb.svg?raw'
import twd from '@/assets/flags/twd.svg?raw'
import uah from '@/assets/flags/uah.svg?raw'
import usd from '@/assets/flags/usd.svg?raw'
import vef from '@/assets/flags/vef.svg?raw'
import vnd from '@/assets/flags/vnd.svg?raw'
import xag from '@/assets/flags/xag.svg?raw'
import xau from '@/assets/flags/xau.svg?raw'
import xdr from '@/assets/flags/xdr.svg?raw'
import zar from '@/assets/flags/zar.svg?raw'

interface FlagProps {
  type: string
}

const props = defineProps<FlagProps>()
const icons: Record<string, string> = {
  defaultIcon,
  tryIcon,
  aed,
  ars,
  aud,
  bdt,
  bhd,
  bmd,
  brl,
  btc,
  cad,
  chf,
  clp,
  cny,
  czk,
  dkk,
  eur,
  gbp,
  hkd,
  huf,
  idr,
  ils,
  inr,
  jpy,
  krw,
  kwd,
  lkr,
  mmk,
  mxn,
  myr,
  ngn,
  nok,
  nzd,
  php,
  pkr,
  pln,
  rub,
  sar,
  sek,
  sgd,
  thb,
  twd,
  uah,
  usd,
  vef,
  vnd,
  xag,
  xau,
  xdr,
  zar,
}
const icon = icons[props.type] || icons.defaultIcon
</script>

<template>
  <div class="flag" v-html="icon"></div>
</template>

<style>
.flag {
  width: 28px;
  color: currentColor;
}
.flag svg {
  display: block;
}
</style>
