# Vue Smart Questions
Vue framework for building forms with simple question trees.

## Getting started

Pull in the package:
```
yarn add vue-smart-questions
```

Import in your code:
```
import SmartQuestions from 'vue-smart-questions';
export default {
    components: {
        SmartQuestions
    },
    methods: {
        handleSubmit(answers) {
            console.log(answers);
        },
    },
    data() {
        return {
            form: {
                'questions': [
                    {
                        'id': '1',
                        'question': 'Hello world!',
                        'type': 'OPTIONS',
                        'next_question_id': null,
                        'description': false,
                        'placeholder': null,
                        'answers': [{
                            'id': '1',
                            'name': 'Hello',
                            'value': 'hello',
                            'next_question_id': null
                        }, {
                            'id': '2',
                            'name': 'World',
                            'value': 'world',
                            'next_question_id': null
                        }]
                    }
                }
            }
        }
    }
}
```
Use in your template:
```
<SmartQuestions
    :debug="false"
    @submit="handleSubmit"
    :form="form"></SmartQuestions>
```

## Building forms

### Question object

```
{
    'id': '1', // Used for identifying a specific question, has to be unique
    'question': 'Do you have any open-source projects?', // The question
    'type': 'OPTIONS', // Question type
    'next_question_id': null, // Next question in the sequence
    'description': false, // Description field
    'placeholder': null, // Placeholder (Only applicable for TEXT, TEXTAREA and NUMBER)
    'answers': [] // Predefined answers, only applicable for CHECKBOX and OPTIONS
}
```

#### Question types:
* OPTIONS
* TEXT
* TEXTAREA
* NUMBER
* CHECKBOX

### OPTIONS and CHECKBOX can have predefined answers:

```
{
    'id': '1',
    'question': 'Do you have any open-source projects?',
    'type': 'OPTIONS',
    'next_question_id': null,
    'description': false,
    'placeholder': null,
    'answers': [{
        'id': '1',
        'name': 'Yes', // Label
        'value': 'yes', // Value
        'next_question_id': '2' // Jump to question 2
    }, {
        'id': '5',
        'name': 'No', // Label
        'value': 'no', // Value
        'next_question_id': '3' // Jump to question 3
    }]
}
```

### Example form

```
export default {
    'questions': [
        {
            'id': '1',
            'question': 'Do you have any open-source projects?',
            'type': 'OPTIONS',
            'next_question_id': null,
            'description': false,
            'placeholder': null,
            'answers': [{
                'id': '1',
                'name': 'Yes',
                'value': 'yes',
                'next_question_id': '2'
            }, {
                'id': '5',
                'name': 'No',
                'value': 'no',
                'next_question_id': '3'
            }, {
                'id': '6',
                'name': 'Skip to end',
                'value': 'skip',
                'next_question_id': '5'
            }]
        },
        {
            'id': '2',
            'question': 'How many open-source projects do you have?',
            'description': 'Please specify how many open-source projects you have',
            'type': 'NUMBER',
            'next_question_id': '3',
            'answers': [],
            'placeholder': null
        },
        {
            'id': '3',
            'question': 'What is your Github name?',
            'placeholder': 'eg. SabatinoMasala',
            'type': 'TEXT',
            'answers': [],
            'next_question_id': '4',
            'description': ''
        }, {
            'id': '4',
            'question': 'Short bio',
            'type': 'TEXTAREA',
            'answers': [],
            'next_question_id': '5',
            'description': '',
            'placeholder': 'Lorem ipsum dolor sit amet'
        },
        {
            'id': '5',
            'question': 'How would you like to be contacted?',
            'type': 'CHECKBOX',
            'answers': [{
                'id': '1',
                'name': 'Email',
                'value': 'email',
                'next_question_id': null
            }, {
                'id': '5',
                'name': 'Phone',
                'value': 'phone',
                'next_question_id': null
            }],
            'next_question_id': null,
            'description': '',
            'placeholder': null
        }
    ],
    'questions_bak': {
        'question_1': {
            'id': '1',
            'question': 'Do you have children?',
            'type': 'OPTIONS',
            'next_question_id': null,
            'description': false,
            'placeholder': null,
            'answers': [{
                'id': '1',
                'name': 'Yes',
                'value': 'yes',
                'next_question_id': '2'
            }, {
                'id': '5',
                'name': 'No',
                'value': 'no',
                'next_question_id': '3'
            }]
        },
        'question_2': {
            'id': '2',
            'question': 'How many children do you have?',
            'description': 'Please specify how many children you have',
            'type': 'NUMBER',
            'next_question_id': '3',
            'answers': [],
            'placeholder': null
        },
        'question_3': {
            'id': '3',
            'question': 'What is your name?',
            'placeholder': 'eg. John Doe',
            'type': 'TEXT',
            'answers': [],
            'next_question_id': '4',
            'description': ''
        },
        'question_4': {
            'id': '4',
            'question': 'Short bio',
            'type': 'TEXTAREA',
            'answers': [],
            'next_question_id': '5',
            'description': '',
            'placeholder': null
        },
        'question_5': {
            'id': '5',
            'question': 'How would you like to be contacted?',
            'type': 'CHECKBOX',
            'answers': [{
                'id': '1',
                'name': 'Email',
                'value': 'email',
                'next_question_id': null
            }, {
                'id': '5',
                'name': 'Phone',
                'value': 'phone',
                'next_question_id': null
            }],
            'next_question_id': null,
            'description': '',
            'placeholder': null
        }
    }
}
```