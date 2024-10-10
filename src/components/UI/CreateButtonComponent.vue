<template>
    <div>
        <button
        v-if="!loading"
        @click.prevent = "createEntity"
        :disabled = "selectedEntity === 'none'"
        :class = "{ 'disabled': selectedEntity === 'none' }"
        >
            Создать
        </button>
        <LoadingSpinner v-if="loading"/>
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useListStore } from '@/stores/useListStore';
import LoadingSpinner from '@/components/UI/LoadingSpinner.vue';
import axios from 'axios';
import { getAccessToken } from '@/utils/getAccessToken';

const store = useListStore();
const selectedEntity = computed(() => store.selectedEntity);
const entityList = computed(() => store.entityList);

const loading = ref(false);

const API_URL = 'https://api.amocrm.com/api/v4';

const createEntity = async () => {
    loading.value = true;
    try {
        const {accessToken} = await getAccessToken();
        console.log("",  accessToken);
        if (!accessToken) {
            console.error('Токен доступа не найден');
            return null;
        }

        const response = await axios.post(API_URL + selectedEntity.value, 
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}` ,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log("response",  response);

        handleSuccessfulResponse(response);
    } catch (err) {
        handleError(err);
    }
}

const handleSuccessfulResponse = (response) => {
    if(response.status === 200) {

        const responseData = response.data;
        addEntity(responseData)

    } else if (data.status === 401) {
        console.error("Пользователь не авторизирован", response.data)
    } else if (data.status === 400) {
        console.error("Переданы некорректные данные. Подробности доступны в теле ответа", response.data)
    }
    updateElementState()
}

const updateElementState = () => {
    store.updateSelectedEntity('none');
    loading.value = false;
}

const handleError = (err) => {
    console.error("Произошла ошибка", err)
    updateElementState()
}

const addEntity = (responseData) => {
    entityList.value.push({
        id: responseData.id,
        name: responseData.request_id
    });
    console.info("Контакты были успешно созданы", responseData)
}



</script>

<style scoped>

div {
    width: 100%;
    text-align: center;
}
button {
    border-radius: 5px;
    color: rgb(236, 243, 254);
    background: rgb(76, 139, 247);
    border: 1px solid #b7ccef;
    min-width: 100px;
    min-height: 30px;
    font-weight: 700;
    transition: all .4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
    cursor: pointer;
}

button.disabled {
    background: rgb(252, 252, 252);
    border: 1px solid #e1e4e5;
    color: #2e3640;
    cursor: not-allowed;
}

</style>