<template>
  <el-form v-bind="$attrs" v-on="$listeners" :model="value" ref="form"  label-width="90px"  :inline="true">
    <el-row :gutter="20" type="flex">
      <template v-for="(item, index) in field">
        <!-- <el-col :key="item.prop" :xs="24" :sm="24" :md="12" :lg="8" :xl="item.span || 4" v-bind="item"> -->
        <div :key="item.prop"  v-bind="item">
          <template v-if="['button','submit','reset'].includes(item.type)" :class="item.class">
            <template v-if="Array.isArray(item.options)">
              <el-button style="margin-left:20px;"  v-for="(k,i) in item.options" :key="i"  v-bind="k" @click="handleClick(k, i)">{{ k.label }}</el-button>
              <el-button  v-if="item.type == 'reset'" :type="item.style" @click="reset(item, index)">{{ item.label }}</el-button>
            </template>
            <el-button style="margin-left:20px;" v-else-if="item.type == 'reset'" :type="item.style" @click="reset(item, index)">{{ item.label }}</el-button>
            <el-button   round v-else :type="item.style" @click="handleClick(item, index)">{{ item.label }}</el-button>
          </template>
          <template v-else v-bind="item">
            <el-form-item    v-if="item.type == 'select'"  :label="item.name">
              <el-select v-model="form[item.prop]" v-bind="item" @change="handleClick(item, index)" @focus="handleClick(item, index)" clearable>
                <template v-if="typeof item.options === 'function'"> {{getOptions(item, index)}}</template>
                <template v-else>
                  <el-option v-for="(k,i) in item.options" :key="i" :label="getField(item, k, 'label')" :value="getField(item, k, 'value')"></el-option>
                </template>
              </el-select>
            </el-form-item>  
         
            <div v-else-if="item.type == 'imgUrl'"  class="imgUrl" v-bind="item"  clearable>
              <div  v-for="(k,i) in form[item.prop]" :key="i" >
                <!-- <img :src="k" alt=""> -->
                <el-image
                  style="width: 120px; height: 120px"
                  :src="k"
                  fit="cover"
                  :preview-src-list="[k]"
                ></el-image>
              </div>
            </div>
            <template v-else-if="item.type == 'cascader'">
              <template v-if="typeof item.options === 'function'"> {{getOptions(item, index)}}</template>
              <el-cascader v-else v-model="form[item.prop]"  v-bind="item" :options="item.options" :props="item.config || {}" @change="handleClick(item, index,$event)" @focus="handleClick(item, index)" clearable></el-cascader>
            </template>
            <el-form-item v-else-if="item.type == 'ranges'" :label="item.name">
              <div class="range">
                <el-input v-model.trim="form[item.prop]" v-bind="item" clearable />
                <span>-</span>
                <el-input v-model.trim="form[item.prop1]" v-bind="item" clearable />
              </div>
            </el-form-item>
            <el-form-item v-else-if="item.type == 'pickerOptionsPicker'"   :label="item.name">
              <el-date-picker
                v-bind="item"
                v-model="form[item.prop]"
                type="datetimerange"
                :picker-options=" pickerOptions"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
              ></el-date-picker>
            </el-form-item>
            <el-form-item v-else-if="item.type == 'pickerOptionsDate'"   :label="item.name">
              <el-date-picker
                v-bind="item"
                v-model="form[item.prop]"
                type="datetimerange"
                :picker-options=" pickerApiOld"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
              ></el-date-picker>
            </el-form-item>
            <template v-else-if="item.type == 'rangesDatetime'">
              <div class="range">
                <el-time-picker v-bind="item" v-model="form[item.prop]" range-separator="-" value-format="HH:mm:ss" format="HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间" clearable />
                <span>-</span>
                <el-time-picker v-bind="item" v-model="form[item.prop1]" range-separator="-" value-format="HH:mm:ss" format="HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间" clearable />
              </div>
            </template>
            <template v-else-if="['datetimerange','datetime','date','daterange',].includes(item.type)">
              <el-date-picker v-model="form[item.prop]" range-separator="-" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间" clearable v-bind="item" />
            </template>
            <template v-else-if="['date','daterange',].includes(item.type)">
              <el-date-picker v-bind="item" v-model="form[item.prop]" range-separator="-" value-format="yyyy-MM-dd" format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期" clearable />
            </template>
            <template v-else-if="['time'].includes(item.type)">
              <el-time-picker v-bind="item" v-model="form[item.prop]" range-separator="-" value-format="HH:mm:ss" format="HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间" clearable />
            </template>
            <template v-else-if="['timestart'].includes(item.type)">
              <!-- <el-time-select v-bind="item" v-model="form[item.prop]" range-separator="-" value-format="HH:mm:ss" format="HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间" clearable /> -->
              <el-time-select placeholder="起始时间" v-model="form[item.prop]" format="HH:mm:ss" :picker-options="item.config || { start: '00:00', step:'00:01', end: '23:59' }" />
            </template>
            <template v-else-if="['timeend'].includes(item.type)">
              <!-- <el-time-select v-bind="item" v-model="form[item.prop]" range-separator="-" value-format="HH:mm:ss" format="HH:mm:ss" start-placeholder="开始时间" end-placeholder="结束时间" clearable /> -->
              <el-time-select placeholder="起始时间" v-model="form[item.prop]" format="HH:mm:ss" :picker-options="item.config || { start: '00:00',step:'00:01',  end: '23:59',minTime:form[item.end] }" />
            </template>

            <template v-else-if="item.type == 'checkbox'">
              <template v-if="Array.isArray(item.options)">
                <template v-for="k in item.options">
                  <el-radio v-model="form[item.prop]" :key="k.value" :label="k.value">{{k.label}}</el-radio>
                </template>
              </template>
              <el-radio v-else v-model="form[item.prop]" :label="item.value">{{k.label}}</el-radio>
            </template>
            <el-form-item   v-else-if="item.type == 'number'" :label="item.name">
              <el-input   v-model.number.trim="form[item.prop]" v-bind="item" :show-password="item.type=='password'" @focus="handleClick(item, index)" @input="handleClick(item, index)" @change="handleClick(item, index)" @blur="handleClick(item, index)" clearable></el-input>
             </el-form-item>
            <el-form-item   v-else   :label="item.name">
              <el-input v-model.trim="form[item.prop]" show-word-limit :maxlength="item.maxlength"  v-bind="item" :show-password="item.type=='password'" @focus="handleClick(item, index)" @input="handleClick(item, index)" @change="handleClick(item, index)" @blur="handleClick(item, index)" clearable></el-input>
             </el-form-item>
          </template>
        </div>
      </template>
    </el-row>
  </el-form>
</template>
<script>
import { pickerOptionsApi  } from '../utils/config'
export default {
  name: 'mixForm',
  props: {
    value: {
      type: Object,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
  },
  created() {
    // console.log( pickerOptionsApi,baseUrl )
  },
  watch: {
    value: {
      handler(a, b) {
        this.form = a;
      },
      immediate: true,
    },
    fields: {
      handler(a, b) {
        this.field = [...a];
      },
      deep: true,
      immediate: true,
    },
    form: {
      handler(a, b) {
        this.$emit('input', a);
      },
      deep: true,
    },
  },
  data() {
    // const pickerOptionsApi = pickerOptionsApi
    return {
      pickerOptions:pickerOptionsApi,
      pickerApiOld : {
         // 设置不能选择的日期
        onPick: ({ maxDate, minDate }) => {
            this.choiceDate0 = minDate.getTime();
            if (maxDate) {
                this.choiceDate0 = '';
            }
        },
        disabledDate:
            (time) => {
                let choiceDateTime = new Date(this.choiceDate0).getTime();
                const minTime = new Date(choiceDateTime).setMonth(new Date(choiceDateTime).getMonth() - 1);
                const maxTime = new Date(choiceDateTime).setMonth(new Date(choiceDateTime).getMonth() + 1);
                const min = minTime;
                const newDate = new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1;
                const max = newDate < maxTime ? newDate : maxTime;
            //如果已经选中一个日期 则 返回 该日期前后一个月时间可选
                if (this.choiceDate0) {
                    return time.getTime() < min || time.getTime() > max;
                }
            //若一个日期也没选中 则 返回 当前日期以前日期可选
                return time.getTime() > newDate;
            }
      },
      form: {},
      field: [],
      date: [],
      // disabled:  getStore('userinfo').grants == 'root' ? false :true
    };
  },
  methods: {
    async validate() {
      return this.$refs['form'].validate();
    },
    async handleClick(item, index, event) {
      if (item.type == 'submit') {
        try {
          await this.$refs['form'].validate();
        } catch (error) {
          this.$message.error('请根据提示，将表单输入完整！');
          return;
        }
      }
      let fn = () => {};
      ['click', 'change', 'focus', 'blur', 'input'].forEach((e) => {
        if (item[e] && item[e] instanceof Function) fn = item[e];
        if (item[e] && item[e] instanceof String) fn = this.$parent[item[e]];
      });
      fn({ item, index, event });
    },
    getField(item, k, val) {
      if (item.config && item.config[val]) {
        return k[item.config[val]];
      }
      return k[val];
    },
    async getOptions(item, index) {
      try {
        if (!item.options) {
          console.error('缺少options参数');
          return [];
        } else if (item.options instanceof Array) {
          console.log('array', item.options);
          return item.options;
        } else if (item.options instanceof Function) {
          let res = await item.options(item, index);
          item = Object.assign({}, item);
          item.options = res;
          this.field.splice(index, 1, item);
        }
      } catch (error) {
        console.log(error);
      }
    },
    reset(item, index) {
      this.$refs['form'].resetFields();
      this.handleClick(item, index);
      this.$emit('reset');
    },
    resetFields() {
      this.$refs['form'].resetFields();
    },
    download() {},
  },
};
</script>
<style lang="less" scoped>
.el-form {
  padding-bottom: 30px;
  /deep/.el-row--flex{
    flex-wrap: wrap;
  }
}
/deep/ .el-form-item__label:before {
  margin-left: -10px;
}
.el-col {
  white-space: nowrap;
  min-width: 300px;
}
.range {
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    padding: 0 5px;
  }
}
.imgUrl{
  display: flex;
  flex-wrap: wrap;
  div{
    width: 120px;
    height: 120px;
    margin: 8px;
    display: inline-flex;
    img{
      display: block;
      height: auto;
       width: 100%;
    }
  }
}
// .el-form {
//   .el-row--flex{
//     margin: 0!important;
//   }
// } 
</style>
<style lang="less" >
/deep/.el-image-viewer__wrapper {
  z-index: 3400;
}
</style>
