<template>
    <input
            type="number"
            class="form-control"
            v-bind:value="value"
            v-on:input="updateValue($event.target.value)">
</template>
<script>
    export default {
        name: 'number',
        props: ['value'],
        methods: {
            updateValue(value) {
                this.$emit('input', Number(value));
            }
        }
    }
</script>