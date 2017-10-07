// TODO explore dynamic imports
import Checkbox from '@/components/fields/Checkbox';
import Number from '@/components/fields/Number';
import Options from '@/components/fields/Options';
import Text from '@/components/fields/Text';
import TextArea from '@/components/fields/TextArea';
export default {
    progressStyle: 'progressbar',
    components: {
        fields: {
            checkbox: Checkbox,
            number: Number,
            options: Options,
            text: Text,
            textarea: TextArea
        }
    }
}
