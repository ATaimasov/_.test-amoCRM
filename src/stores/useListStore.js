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
            { entity: 'Сделка', id: 0, },
            { entity: 'Контакт', id: 1, },

        ],
        loading: false
    }),
    actions: {
        updateSelectedEntity(entity) {
            this.selectedEntity = entity;
        }
    }
});