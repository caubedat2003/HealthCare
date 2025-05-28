import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    Stack,
    Avatar,
    IconButton,
    InputAdornment
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';

const USER_AVATAR = "https://www.svgrepo.com/show/384670/account-avatar-profile-user.svg";
const BOT_AVATAR = "https://img.freepik.com/premium-vector/support-bot-ai-assistant-flat-icon-with-blue-support-bot-white-background_194782-1421.jpg?semt=ais_hybrid&w=740";


function Chatbot() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isFinished, setIsFinished] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        startConversation();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const startConversation = async () => {
        try {
            const res = await axios.post('http://localhost:5000/chatbot/start', {}, { withCredentials: true });
            setMessages([{ text: res.data.message, sender: 'bot' }]);
            setIsFinished(false);
        } catch (err) {
            console.error('Error starting conversation:', err);
            setMessages([{ text: 'Error starting the chat.', sender: 'bot' }]);
        }
    };

    const handleSendMessage = async () => {
        if (!input.trim() || isFinished) return;
        const userMessage = { text: input, sender: 'user' };
        setMessages((prev) => [...prev, userMessage]);
        try {
            const res = await axios.post('http://localhost:5000/chatbot/respond', { input }, { withCredentials: true });
            const botMessage = { text: res.data.message, sender: 'bot' };
            setMessages((prev) => [...prev, botMessage]);
            if (res.data.finished) {
                setIsFinished(true);
            }
        } catch (err) {
            setMessages((prev) => [...prev, { text: 'Error processing your response.', sender: 'bot' }]);
        }
        setInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <Paper elevation={3} sx={{ maxWidth: 900, mx: 'auto', mt: 5, p: 2, height: '60vh', display: 'flex', flexDirection: 'column' }}>
            {/* Chat Messages */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, px: 1 }}>
                {messages.map((msg, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                            mb: 1,
                        }}
                    >
                        {msg.sender === 'bot' && (
                            <Avatar src={BOT_AVATAR} alt="Bot" sx={{ mr: 1, width: 48, height: 48 }} />
                        )}
                        <Box
                            sx={{
                                bgcolor: msg.sender === 'user' ? '#1976d2' : '#e0e0e0',
                                color: msg.sender === 'user' ? 'white' : 'black',
                                px: 2,
                                py: 1,
                                borderRadius: 2,
                                maxWidth: '75%',
                                whiteSpace: 'pre-line',
                                fontSize: '1rem',
                            }}
                        >
                            <Typography variant="body1">
                                <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
                            </Typography>
                        </Box>
                        {msg.sender === 'user' && (
                            <Avatar src={USER_AVATAR} alt="User" sx={{ ml: 1, width: 48, height: 48 }} />
                        )}
                    </Box>
                ))}
                <div ref={chatEndRef}></div>
            </Box>

            {/* Input Section */}
            {!isFinished ? (
                <TextField
                    fullWidth
                    variant="outlined"
                    size="medium"
                    placeholder="Type your response..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <ChatIcon color="primary" />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleSendMessage} color="primary">
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                        style: { fontSize: '1rem' }
                    }}
                    inputProps={{
                        style: { padding: '12px' }
                    }}
                />
            ) : (
                <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    onClick={startConversation}
                    sx={{ fontSize: '1rem', mt: 1 }}
                >
                    Start New Chat
                </Button>
            )}
        </Paper>
    );
}

export default Chatbot;