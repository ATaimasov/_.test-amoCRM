<template>
    <div class="dropdown">
        <label for="list"><b>Выбери сущность</b></label>
        <select name="list" id="list" v-model="store.selectedEntity">
            <option value="none">Не выбрано</option>
            <option v-for="entity in store.entityList" :key="entity.value" :value="entity.value">{{ entity.name }}</option>
        </select>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useListStore } from '@/stores/useListStore';

const store = useListStore()

const updateEntity = () => {
    console.log('Selected entity updated to:', store.selectedEntity);
};

</script>

<style  scoped>

.dropdown {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

label {
    text-align: center;
}

select {
    min-height: 30px;
    min-width: 100px;
}

</style>