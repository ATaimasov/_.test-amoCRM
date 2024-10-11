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
import { getAccessToken } from '@/utils/getAccessToken';

const store = useListStore();
const selectedEntity = computed(() => store.selectedEntity);
const entityList = computed(() => store.entityList);
const entityCreatedList = computed(() => store.entityCreatedList);

const loading = ref(false);

const createEntity = async () => {
    loading.value = true;
    try {
        const {access_token, base_domain} = await getAccessToken();
        if (!access_token) {
            console.error('Токен доступа не найден');
            return null;
        }

        const API_URL =`https://${base_domain}/api/v4/${selectedEntity.value}`

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${access_token}` ,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: ['test'],
            }),
        })

        const result = await response.json();

        handleSuccessfulResponse(response, result);
    } catch (err) {
        handleError(err);
    }
}

const handleSuccessfulResponse = (response, result) => {
    if(response.status === 200) {
        addEntity(result)

    } else if (response.status === 400) {
        console.error("Переданы некорректные данные. Подробности доступны в теле ответа", response)
    }
    updateElementState()
}

const updateElementState = () => {
    store.updateSelectedEntity('none');
    loading.value = false;
}

const handleError = (err) => {
    if(err.status === 401) {
        console.error("Пользователь не авторизирован", err)
    } 
    
    console.error("Произошла ошибка", err)
    


    updateElementState()
}



const addEntity = (result) => {

    let entity = ''
    switch (selectedEntity.value) {
        case 'leads':
            entity = 'Сделка'
            break
        case 'contacts':
            entity = 'Контакт'
            break
        case 'companies':
            entity = 'Компания'
            break
    }

    entityCreatedList.value.push({
        id: result._embedded[selectedEntity.value][0].id,
        entity: entity
    });
    console.info("Сущность была успешно создана", result._embedded.leads)
    console.log("entityList",  entityCreatedList.value)
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