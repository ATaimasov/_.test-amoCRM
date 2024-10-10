<template>
    <div class="results" v-if="entityCreatedList.length > 0">
        <h1 >Список созданных сущностей</h1>
        <table>
            <thead>
                <tr>
                    <th>Сущность</th>
                    <th>ID</th>
                </tr>
            </thead>
           <tbody>
                <tr v-for="entity in entityCreatedList" :key="entity.id">
                    <td>{{ entity.entity }}</td>
                    <td>{{ entity.id }}</td>
                </tr>
           </tbody>
        </table>
    </div>
</template>

<script setup>
import { useListStore } from '@/stores/useListStore';
import { computed } from 'vue'


const store = useListStore();
const entityCreatedList = computed(() => store.entityCreatedList);



</script>

<style scoped>




.results {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 50px;
}

h1 {
    font-size: 1.5rem;
}

table {
    border-collapse: collapse;
    width: 100%;
    text-align: center;
    border-spacing: 0;
}

th, td {
    padding: 10px;
}

thead th {
    padding-bottom: 25px;
} 

tbody td {
    padding-bottom: 10px;
} 

thead th:first-child,
tbody td:first-child {
    text-align: start;
    padding-left: 20px;
}

</style>