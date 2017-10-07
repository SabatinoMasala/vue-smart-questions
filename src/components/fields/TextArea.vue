<template>
    <textarea
            cols="30"
            rows="10"
            class="form-control"
            v-bind:value="value"
            v-on:input="updateValue($event.target.value)"
            :placeholder="question.placeholder"></textarea>
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