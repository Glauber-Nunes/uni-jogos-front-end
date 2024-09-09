import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

const CadastroNoticia = () => {
    const [titulo, setTitulo] = useState('');
    const [conteudo, setConteudo] = useState('');
    const [imagemUrl, setImagemUrl] = useState('');
    const [mensagemSucesso, setMensagemSucesso] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const novaNoticia = {
            titulo: titulo,
            conteudo: conteudo,
            imagemUrl: imagemUrl
        };

        try {
            const response = await axios.post('http://localhost:8080/api/noticias', novaNoticia);
            if (response.status === 200) {
                setMensagemSucesso('Notícia cadastrada com sucesso!');
                setTitulo('');
                setConteudo('');
                setImagemUrl('');
            }
        } catch (error) {
            console.error("Erro ao cadastrar notícia:", error);
        }
    };

    return (
        <Container>
            <h2 className="mt-4">Cadastro de Notícia</h2>
            {mensagemSucesso && <p className="text-success">{mensagemSucesso}</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="titulo">
                    <Form.Label>Título</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Digite o título da notícia" 
                        value={titulo} 
                        onChange={(e) => setTitulo(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="conteudo">
                    <Form.Label>Conteúdo</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={5} 
                        placeholder="Digite o conteúdo da notícia" 
                        value={conteudo} 
                        onChange={(e) => setConteudo(e.target.value)} 
                        required 
                    />
                </Form.Group>

                <Form.Group controlId="imagemUrl">
                    <Form.Label>URL da Imagem</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Digite o URL da imagem" 
                        value={imagemUrl} 
                        onChange={(e) => setImagemUrl(e.target.value)} 
                    />
                </Form.Group>

                <Button variant="primary" type="submit">Cadastrar Notícia</Button>
            </Form>
        </Container>
    );
};

export default CadastroNoticia;
