<template>
  <p>person</p>
  <button @click="onGetHobbyById()">get hobby</button>
  <p>{{ hobbyInfo }}</p>
  <br />
  <p>create</p>
  <input type="text" v-model="nameHobby" />
  <br />
  <button @click="onCreateHobby()">create</button>
  <br />
  {{ createdHobby }}
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useGraphqlQuery, useGraphqlMutation } from '../composables/useGraphql';
import { getHobby } from '../graphql/query';
import { createHobby } from '../graphql/mutation';

export default defineComponent({
  name: 'Home',
  components: {},
  props: {},
  setup() {
    const nameHobby = ref<string>();
    const hobbyInfo = ref();
    const createdHobby = ref();

    const onGetHobbyById = async () => {
      const result = (await useGraphqlQuery(getHobby, { id: '61de559a1a0a0087f057039d' })) as { hobby: unknown };
      console.log('>>> result', result);
      hobbyInfo.value = result.hobby;
    };

    const onCreateHobby = async () => {
      console.log('nameHobby.value', nameHobby.value);
      const result = (await useGraphqlMutation(createHobby, { name: nameHobby.value })) as { createHobby: unknown };
      console.log('>>> result', result);
      createdHobby.value = result.createHobby;
    };

    return {
      nameHobby,
      hobbyInfo,
      createdHobby,

      onGetHobbyById,
      onCreateHobby,
    };
  },
});
</script>
