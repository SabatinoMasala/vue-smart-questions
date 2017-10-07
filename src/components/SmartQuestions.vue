<template>
    <div class="card">
        <div class="card-body" v-if="debug">
            <strong>Debug values</strong>
            <ul class="list-unstyled">
                <li>Current answer: {{ answer }}</li>
                <li>Question type: {{ currentQuestion.type }}</li>
                <li>Longest path: {{ minimumRemainingQuestionAmount }}</li>
                <li>Shortest path: {{ maximumRemainingQuestionAmount }}</li>
            </ul>
        </div>
        <QuestionHeader :config="{settings, currentQuestion, progress}"></QuestionHeader>
        <div class="card-body">
            <div class="row">
                <div class="col-12">
                    <InputResolver
                            v-model="answer.value"
                            :config="{settings, currentQuestion}"></InputResolver>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <div class="row">
                <div class="col-6">
                    <button class="btn btn-outline-secondary" @click.stop.prevent="back" v-bind:disabled="!canGoBack">Back</button>
                </div>
                <div class="col-6 text-right">
                    <button v-if="!isLast" class="btn btn-primary" @click.stop.prevent="next" v-bind:disabled="!canContinue">Next</button>
                    <button type="submit" v-if="isLast" class="btn btn-primary" @click.stop.prevent="next" v-bind:disabled="!canContinue">Submit</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {getQuestionById} from '../helpers/Utils'
    import defaultConfig from '../settings/default'
    import FindLongestAndShortestPath from '../helpers/FindLongestAndShortestPath';
    import QuestionHeader from '../components/QuestionHeader';
    import InputResolver from '../components/InputResolver';
    export default {
        name: 'SmartQuestions',
        props: ['form', 'config', 'debug'],
        components: {
            InputResolver,
            QuestionHeader
        },
        created() {
            this.settings = Object.assign({}, this.defaultConfig, this.config);
            this.currentQuestion = this.form.questions[0];
        },
        mounted() {
            this.init();
        },
        computed: {
            currentKey() {
                return this.currentQuestion.id
            },
            canContinue() {
                if (this.currentQuestion && this.currentQuestion.name) {
                    return true;
                }

                return this.answer && this.answer.value !== '' && !this.blockContinue;
            },
            isLast() {
                return this.maximumRemainingQuestionAmount === 1;
            },
            canGoBack() {
                return this.questionHistory.length > 0 && !this.blockGoBack;
            }
        },
        methods: {
            // Init the form
            init() {
                this.answer = this.getInitialAnswerForQuestion(this.currentQuestion);
                this.updateMinAndMax();
            },
            // Reset the form
            reset() {
                this.currentQuestionIndex = 0;
                this.blockContinue = false;
                this.blockGoBack = false;
                this.answers = {};
                this.questionHistory = [];
                this.maximumRemainingQuestionAmount = 0;
                this.minimumRemainingQuestionAmount = 0;
                this.answer = '';
                this.currentQuestion = {};
                this.progress = 0;
                this.currentQuestion = this.form.questions[0];
                this.init();
            },
            // Setup the answer value
            getInitialAnswerForQuestion(question) {
                let value = '';
                if (question.type === 'NUMBER') {
                    value = 0;
                } else if (question.type === 'CHECKBOX') {
                    value = question.answers.map((answer) => {
                        return {
                            checked: false,
                            value: answer.value
                        }
                    });
                }
                return {
                    value: value,
                    type: question.type
                };
            },

            // Submit all values
            submitValues() {
                this.progress = 100;
                this.blockContinue = true;
                this.blockGoBack = true;
                this.$emit('submit', this.answers);
            },

            // Update the progress indicator
            updateProgress() {
                let questionProgress = (this.currentQuestionIndex / (this.maximumRemainingQuestionAmount + this.currentQuestionIndex)) * 100;
                if (this.isLast) {
                    // Force the progress to 90% when we're at the last question
                    if (questionProgress < 90) {
                        this.progress = 90;
                    }
                } else {
                    this.progress = questionProgress;
                }
            },

            // Update shortest and longest path
            updateMinAndMax() {
                this.maximumRemainingQuestionAmount = this.getMaximumRemainingQuestions();
                this.minimumRemainingQuestionAmount = this.getMinimumRemainingQuestions();
            },

            // Longest path
            getMaximumRemainingQuestions() {
                let shortestAndLongest = this.getShortestAndLongestPath();
                return Math.min(shortestAndLongest[0], shortestAndLongest[1]);
            },

            // Shortest path
            getMinimumRemainingQuestions() {
                let shortestAndLongest = this.getShortestAndLongestPath();
                return Math.max(shortestAndLongest[0], shortestAndLongest[1]);
            },

            // Minimum and maximum path
            getShortestAndLongestPath() {
                return FindLongestAndShortestPath(this.form, this.currentQuestion);
            },

            submit() {
                // Only submit if we can continue
                if (this.canContinue) {
                    this.next();
                }
            },

            next() {
                // Only when we can continue
                if (!this.canContinue) { return }
                // Increase the current question index
                this.currentQuestionIndex += 1;
                // Store the current answer
                this.answers[this.currentKey] = this.answer;
                // If this is the last question, submit the form
                if (this.isLast) {
                    this.submitValues();
                    return;
                }
                // Build a question history
                this.questionHistory.push(this.currentQuestion);
                // Search for the next question
                if (this.currentQuestion.type === 'OPTIONS') {
                    // The next question is stored in the answers
                    let nextQuestions = this.currentQuestion.answers.filter((answer) => {
                        return answer.value === this.answer.value;
                    });
                    if (nextQuestions.length > 0) {
                        let nextQuestionId = nextQuestions[0].next_question_id;
                        this.currentQuestion = getQuestionById(this.form.questions, nextQuestionId);
                    } else {
                        console.error('No further questions found, form schema is probably wrong')
                    }
                } else {
                    // The next question is stored on the question itself
                    let nextQuestionId = this.currentQuestion.next_question_id;
                    this.currentQuestion = getQuestionById(this.form.questions, nextQuestionId);
                }
                // Reset the value
                this.answer = this.getInitialAnswerForQuestion(this.currentQuestion);
                // Update minimum and maximum path
                this.updateMinAndMax();
                // Update progress
                this.updateProgress();
            },

            back() {
                // Only when we can go back
                if (!this.canGoBack) { return }
                // Get the previous question
                this.currentQuestion = this.questionHistory.pop();
                // Update minimum and maximum path
                this.updateMinAndMax();
                // Decrease question index
                this.currentQuestionIndex--;
                // Update (decrease) the progress
                this.updateProgress();
                // Go back to the previous answer
                this.answer = this.answers[this.currentKey];
            }
        },

        data() {
            return {
                settings: {},
                defaultConfig: defaultConfig,
                currentQuestionIndex: 0,
                blockContinue: false,
                blockGoBack: false,
                answers: {},
                questionHistory: [],
                maximumRemainingQuestionAmount: 0,
                minimumRemainingQuestionAmount: 0,
                answer: '',
                currentQuestion: {},
                progress: 0
            }
        }
    }
</script>