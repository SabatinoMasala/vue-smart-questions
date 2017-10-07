import {getQuestionById} from './Utils'

// Get the shortest and longest path
export default function(tree, initialStartNode) {
    const paths = [];
    function findAllPaths(startNode, currentCost) {
        // Only continue when we have a startnode
        if (startNode === undefined) { return; }
        // If we have answers, look for the next question in the answers
        if (startNode.answers.length > 0) {
            startNode.answers.forEach((child) => {
                if (child.next_question_id === null) {
                    paths.push(currentCost);
                } else {
                    // Recurse over the subtree
                    findAllPaths(getQuestionById(tree.questions, child.next_question_id), currentCost + 1);
                }
            });
        } else {
            // Look for the next question in the question
            if (startNode.next_question_id === null) {
                paths.push(currentCost);
            } else {
                // Recurse over the subtree
                findAllPaths(getQuestionById(tree.questions, startNode.next_question_id), currentCost + 1);
            }
        }
    }
    findAllPaths(initialStartNode, 1);
    return [Math.min(...paths), Math.max(...paths)];
}
