<template>
    <ul class="list-group">
        <li class="list-group-item" v-for="option,key in question.answers">
            <label :for="key" class="custom-control custom-radio">
                <input
                        :id="key"
                        name="radio"
                        type="radio"
                        v-bind:value="value"
                        v-on:change="updateValue($event.target.value)"
                        :value="option.value"
                        class="custom-control-input">
                <span class="custom-control-indicator"></span>
                <span class="custom-control-description">{{ option.name }}</span>
            </label>
        </li>
    </ul>
</template>
<script>
    export default {
        name: 'options',
        props: ['value', 'question'],
        methods: {
            updateValue(value) {
                this.$emit('input', value);
            }
        }
    }
</script>