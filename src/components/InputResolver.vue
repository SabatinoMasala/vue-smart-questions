<template>
    <div
            :question="config.currentQuestion"
            v-on:input="updateValue"
            v-bind:value="value"
            :is="currentComponent"></div>
</template>
<script>
    export default {
        name: 'inputresolver',
        props: ['value', 'config'],
        computed: {
            currentComponent() {
                // Find the requested component
                let type = this.config.currentQuestion.type.toLowerCase();
                let availableKeys = Object.keys(this.config.settings.components.fields);
                if (availableKeys.indexOf(type) === -1) {
                    const error = `Field ${type} not found`;
                    throw new Error(error);
                }
                if (this.config.settings.components.fields[type]) {
                    // Return the dynamic component
                    return this.config.settings.components.fields[type]
                }
            }
        },
        methods: {
            updateValue(value) {
                this.$emit('input', value);
            }
        }
    }
</script>