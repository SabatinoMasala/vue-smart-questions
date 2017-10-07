<template>
    <input
            type="text"
            class="form-control"
            :placeholder="question.placeholder"
            v-bind:value="value"
            v-on:input="updateValue($event.target.value)">
</template>
<script>
    export default {
        props: ['value', 'question'],
        methods: {
            updateValue(value) {
                this.$emit('input', value);
            }
        }
    }
</script>