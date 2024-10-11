import { defineStore } from 'pinia'

export const useListStore = defineStore('listStore', {
    state: () => ({
        selectedEntity: 'none',
        entityList: [ 
            { name: 'Сделка', value: 'leads', },
            { name: 'Контакт', value: 'contacts', },
            { name: 'Компания', value: 'companies', },
        ],
        entityCreatedList: [ 
        ],
        loading: false
    }),
    actions: {
        updateSelectedEntity(entity) {
            this.selectedEntity = entity;
        }
    }
});