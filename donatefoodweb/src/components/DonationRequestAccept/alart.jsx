import React from 'react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { setOptions, alert, confirm, prompt, Page, Button } from '@mobiscroll/react';

setOptions({
    theme: 'ios',
    themeVariant: 'light'
});

function App() {
    const showAlert = () => {
        alert({
            title: 'Cellular Data is Turned Off for "Safari"',
            message: 'You can turn on cellular data for this app in Settings.',
        });
    }
    
    const showConfirm = () => {
        confirm({
            title: 'Use location service?',
            message: 'Help apps determine location. This means sending anonymous location data, even when no apps are running.',
            okText: 'Agree',
            cancelText: 'Disagree',
        });
    }
    
    const showPrompt = () => {
        prompt({
            title: 'Sign in to iTunes Store',
            message: 'Enter the Apple ID password for "hello@mobiscroll.com".',
            // placeholder: 'placeholder',
            value: 'initial value',
            inputType: 'text',
        }).then(function (value) {
            console.log('The password is: ' + value);
        });
    }
    
    return (
        <Page>
            <Button onClick={showAlert}>Alert</Button>
            <Button onClick={showConfirm}>Confirm</Button>
            <Button onClick={showPrompt}>Prompt</Button>
        </Page>
    );
}

export default App;