<template>
  <div v-loading="loading">
    <h2>Activity</h2>
    <el-table :data="alertLog" empty-text="">
      <el-table-column label="Alert sent" width="100">
        <template #default="scope">
          <span>
            <el-tag v-if="scope.row.alert_sent" type="success">Sent</el-tag>
            <el-tag v-else type="danger">Not sent</el-tag>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="Alert time">
        <template #default="scope">
          <span>
            {{ shortDate(scope.row.alert_time) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="Rule" prop="rule_name" />
      <el-table-column label="Alert type">
        <template #default="scope">
          <span>
            {{ titleCase(scope.row.alert_info && scope.row.alert_info.type) }}
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios';
import * as changeCase from 'change-case';
import { logger } from '@/lib/logger.js';
import networkError from '../lib/networkError.js';

export default {
  data() {
    return {
      alertLog: [],
      loading: true
    };
  },

  async mounted() {
    await this.getAlertLog();
    this.loading = false;
  },

  methods: {
    titleCase(val) {
      return changeCase.capitalCase(val);
    },

    shortDate(rawDate) {
      let [date, time] = new Date(rawDate).toLocaleString('en-US').split(', ');
      return `${date} ${time}`;
    },

    async getAlertLog() {
      try {
        let res = await axios.get('/api/monitor/meta/alerts?noagg=1');
        const { data, error } = res.data;
        if (error) {
          this.$notify.error({
            message: error,
            title: 'Elasticsearch error',
            duration: 0
          });
          logger().error({ error });
        } else {
          this.alertLog = data;
        }
      } catch (error) {
        networkError(error);
      }
    }
  }
};
</script>
