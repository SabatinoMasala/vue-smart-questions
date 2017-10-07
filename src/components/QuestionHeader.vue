<template>
    <div class="card-header">
        <div class="row">
            <div class="col-12">
                <h1>
                    {{ config.currentQuestion.question }}
                </h1>
                <p v-if="config.currentQuestion.description !== false">{{ config.currentQuestion.description }}</p>
            </div>
            <div class="col-12 mt-3 mb-2">
                <div class="progress">
                    <div v-if="config.settings.progressStyle === 'percentage'">{{ Math.round(config.progress * 100) / 100 }}% complete.</div>
                    <div v-if="config.settings.progressStyle === 'progressbar'" class="progress-bar" v-bind:style="{width: config.progress + '%'}"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['config']
    }
</script>