<template>
  <p>Hobby table</p>
  <input type="text" v-model="hobby.name" placeholder="hobby name" @keyup.enter="onCreateOrUpdateHobby()" />
  <button @click="onCreateOrUpdateHobby()">{{ isEdit ? 'Update' : 'Create' }} hobby</button>
  <table>
    <tr>
      <th>_id</th>
      <th>Name</th>
      <th>Action</th>
    </tr>
    <tr v-for="(item, index) in items" :key="index">
      <td>{{ item._id }}</td>
      <td>{{ item.name }}</td>
      <td>
        <button @click="onDeleteHobby(item._id)">Delete</button>
        <button @click="onEditHobby(item._id)">Edit</button>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref } from 'vue';
import { useGraphqlQuery, useGraphqlMutation } from '../composables/useGraphql';
import { getHobby, getHobbies } from '../graphql/query';
import { createHobby, deleteHobby, updateHobby } from '../graphql/mutation';

interface Hobby {
  _id: string;
  name: string;
}

export default defineComponent({
  name: 'Home',
  components: {},
  props: {},
  setup() {
    const items = ref<Hobby[]>([]);
    const hobby = reactive<Hobby>({ _id: '', name: '' });
    const isEdit = ref<boolean>(false);

    const onGetHobbies = async () => {
      const result = (await useGraphqlQuery(getHobbies, { filters: {} })) as { hobbies: Hobby[] };
      items.value = result.hobbies;
    };

    const onCreateOrUpdateHobby = async () => {
      if (!hobby.name) {
        return;
      }
      if (!isEdit.value) {
        await useGraphqlMutation(createHobby, { name: hobby.name });
      } else {
        const payload = { id: hobby._id, name: hobby.name }
        await useGraphqlMutation(updateHobby, payload);
      }
      hobby.name = '';
      onGetHobbies();
    };

    const onDeleteHobby = async (id: string) => {
      isEdit.value = false;
      hobby._id = '';
      hobby.name = '';
      await useGraphqlMutation(deleteHobby, { id });
      onGetHobbies();
    };

    const onEditHobby = async (id: string) => {
      isEdit.value = true;
      const result = (await useGraphqlQuery(getHobby, { id })) as { hobby: Hobby };
      hobby._id = result.hobby._id;
      hobby.name = result.hobby.name;
    };

    onBeforeMount(() => {
      onGetHobbies();
    });

    return {
      items,
      hobby,
      isEdit,

      onEditHobby,
      onDeleteHobby,
      onCreateOrUpdateHobby,
    };
  },
});
</script>

<style scoped>
td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
button {
  margin-right: 5px;
  margin-left: 5px;
}
</style>
