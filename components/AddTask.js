import React from 'react';

export default class AddTask extends React.Component {

    static navigationOptions = {
        title: 'Add a Task',
    };

    render() {
        return (
            <View>
                <Text>This is the Add Task Page</Text>
            </View>
        );
    }
}