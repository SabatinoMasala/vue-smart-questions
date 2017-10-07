<template>
    <div>
        <ul class="list-group">
            <li class="list-group-item" v-for="option,key in question.answers">
                <label :for="key">
                    <input :id="key" name="checkbox" type="checkbox" v-model="value[key].checked" :value="option.value">
                    {{ option.name }}
                </label>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        name: 'checkbox',
        props: ['value', 'question'],
        methods: {
            updateValue(value) {
                this.$emit('input', value);
            }
        }
    }
</script>