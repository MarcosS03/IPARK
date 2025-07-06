<script>
import HeaderGeral from '@/components/HeaderGeral.vue';
import DAOService from '@/service/DAOService';
import { onBeforeMount, ref } from 'vue';

export default {
    components: {
    HeaderGeral,

  },
    setup() {
        const daoVeiculos = new DAOService('veiculos');
        const daoFabricantes = new DAOService('fabricantes');
        const daoModelos = new DAOService('modelosVeiculos');

        const veiculo = ref({
            placa: '',
            chassi: '',
            renavam: '',
            categoria: '', // <--- NOVA PROPRIEDADE
            modelo: '',
            fabricante: '',
            anoFabricacao: '',
            anoModelo: '',
            cor: '',
            potencia: '',
            capacidade: '',
        });

        const fabricantesOptions = ref([]);
        const modelosOptions = ref([]);
        const coresOptions = ref([
            'Vermelho', 'Preto', 'Branco', 'Prata', 'Azul', 'Amarelo', 'Verde', 'Cinza', 'Dourado', 'Roxo'
        ]);

        // <--- NOVA DEFINIÇÃO DE OPÇÕES DE CATEGORIA
        const categoriasOptions = ref([
            'Automóvel',
            'Motocicleta',
            'Caminhão'
        ]);

        const showMessage = ref(false);
        const messageText = ref('');
        const messageType = ref(''); // 'success' ou 'error'

        const displayMessage = (text, type) => {
            messageText.value = text;
            messageType.value = type;
            showMessage.value = true;
            setTimeout(() => {
                showMessage.value = false;
            }, 3500);
        };

        onBeforeMount(async () => {
            try {
                let promessaFabricante = await fetch("http://localhost:8080/fabricanteVeiculos/fabricantes");
                fabricantesOptions.value = await promessaFabricante.json();
                if (!fabricantesOptions.value || fabricantesOptions.value.length === 0) {
                     displayMessage('Nenhum fabricante encontrado. Cadastre fabricantes primeiro.', 'error');
                }
      
            } catch (error) {
                console.error("Erro ao carregar fabricantes:", error);
                displayMessage('Não foi possível carregar os fabricantes.', 'error');
            }
        });

        const onFabricanteChange = async () => {
            veiculo.value.modelo = '';
            modelosOptions.value = [];

            if (veiculo.value.fabricante) {
                console.log(veiculo.value.fabricante)
                try {
                    const marca = fabricantesOptions.value.find(f => f.fabricante === veiculo.value.fabricante);
                    if (marca) {
                        //const promessaModelos = await fetch("http://localhost:8080/modeloVeiculos/modelos");
                        //const todosModelos = await promessaModelos.json();
                        modelosOptions.value = marca.listaVeiculos
                        if (modelosOptions.value.length === 0) {
                            displayMessage(`Nenhum modelo encontrado para ${veiculo.value.fabricante}.`, 'error');
                        }
                    }
                } catch (error) {
                    console.error("Erro ao carregar modelos:", error);
                    displayMessage('Não foi possível carregar os modelos para este fabricante.', 'error');
                }
            }
        };

        const cadastraVeiculo = async () => {
            // Validações básicas adicionando a nova categoria
            if (!veiculo.value.placa || !veiculo.value.fabricante || !veiculo.value.modelo || !veiculo.value.categoria) {
                displayMessage('Por favor, preencha todos os campos obrigatórios (Placa, Categoria, Fabricante, Modelo).', 'error');
                return;
            }

            try {
                await daoVeiculos.insert(veiculo.value);
                displayMessage('Veículo cadastrado com sucesso!', 'success');
                limpaDadosVeiculo();
            } catch (error) {
                console.error("Erro ao cadastrar veículo:", error);
                displayMessage('Erro ao cadastrar veículo. Verifique os dados e tente novamente.', 'error');
            }
        };

        const limpaDadosVeiculo = () => {
            veiculo.value = {
                placa: '',
                chassi: '',
                renavam: '',
                categoria: '',
                modelo: '',
                fabricante: '',
                anoFabricacao: '',
                anoModelo: '',
                cor: '',
                potencia: '',
                capacidade: '',
            };
            modelosOptions.value = [];
        };

        return {
            veiculo,
            cadastraVeiculo,
            fabricantesOptions,
            modelosOptions,
            coresOptions,
            categoriasOptions,
            onFabricanteChange,
            showMessage,
            messageText,
            messageType,
            limpaDadosVeiculo
        };
    },
};
</script>

<template>
    <header>
        <HeaderGeral/>
    </header>
    <div class="page-wrapper">
        <div :class="['app-message', messageType]" v-if="showMessage">
            {{ messageText }}
        </div>

        <div class="form-card-new">
            <header class="form-header">
                <h2>🚗 Cadastrar Novo Veículo</h2>
                <p>Preencha os detalhes para adicionar um veículo ao sistema.</p>
            </header>

            <form @submit.prevent="cadastraVeiculo" class="vehicle-form">
                <section class="form-section">
                    <h3>Dados Básicos</h3>
                    <div class="form-group">
                        <div class="form-field-new">
                            <label for="placa">Placa</label>
                            <input type="text" id="placa" v-model="veiculo.placa" placeholder="ABC1D23" required>
                        </div>
                        <div class="form-field-new">
                            <label for="chassi">Chassi</label>
                            <input type="text" id="chassi" v-model="veiculo.chassi" placeholder="Ex: 9BW..." required>
                        </div>
                        <div class="form-field-new">
                            <label for="renavam">Renavam</label>
                            <input type="text" id="renavam" v-model="veiculo.renavam" placeholder="12345678900">
                        </div>
                        <div class="form-field-new">
                            <label for="categoria">Categoria</label>
                            <select id="categoria" v-model="veiculo.categoria" required>
                                <option value="" disabled>Selecione a Categoria</option>
                                <option v-for="cat in categoriasOptions" :key="cat" :value="cat">{{ cat }}</option>
                            </select>
                        </div>
                        </div>
                </section>

                <section class="form-section">
                    <h3>Características do Veículo</h3>
                    <div class="form-group">
                        <div class="form-field-new">
                            <label for="fabricante">Fabricante</label>
                            <select id="fabricante" v-model="veiculo.fabricante" @change="onFabricanteChange" required>
                                <option value="" disabled>Selecione um Fabricante</option>
                                <option v-for="f in fabricantesOptions" :key="f.id" :value="f.fabricante">{{ f.fabricante }}</option>
                            </select>
                        </div>
                        <div class="form-field-new">
                            <label for="modelo">Modelo</label>
                            <select id="modelo" v-model="veiculo.modelo" :disabled="!veiculo.fabricante || modelosOptions.length === 0" required>
                                <option value="" disabled>Selecione um Modelo</option>
                                <option v-for="m in modelosOptions" :key="m.id" :value="m.modelo">{{ m.modelo }}</option>
                            </select>
                        </div>
                        <div class="form-field-new">
                            <label for="cor">Cor</label>
                            <select id="cor" v-model="veiculo.cor">
                                <option value="" disabled>Selecione uma Cor</option>
                                <option v-for="c in coresOptions" :key="c" :value="c">{{ c }}</option>
                            </select>
                        </div>
                        <div class="form-field-new">
                            <label for="anoFabricacao">Ano de Fabricação</label>
                            <input type="number" id="anoFabricacao" v-model="veiculo.anoFabricacao" placeholder="2020">
                        </div>
                        <div class="form-field-new">
                            <label for="anoModelo">Ano Modelo</label>
                            <input type="number" id="anoModelo" v-model="veiculo.anoModelo" placeholder="2021">
                        </div>
                        <div class="form-field-new">
                            <label for="potencia">Potência</label>
                            <input type="text" id="potencia" v-model="veiculo.potencia" placeholder="150 CV">
                        </div>
                        <div class="form-field-new">
                            <label for="capacidade">Capacidade</label>
                            <input type="number" id="capacidade" v-model="veiculo.capacidade" placeholder="5 pessoas">
                        </div>
                    </div>
                </section>

                <div class="form-footer">
                    <button type="submit" class="submit-button">Cadastrar Veículo</button>
                    <button type="button" class="clear-button" @click="limpaDadosVeiculo">Limpar Formulário</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
/* Variáveis CSS */
:root {
    --primary-color: #4CAF50; /* Verde mais suave */
    --primary-dark: #45a049;
    --secondary-color: #607D8B; /* Cinza azulado */
    --accent-color: #FFC107; /* Amarelo para destaque */
    --background-light: #f4f7f6;
    --card-bg: #ffffff;
    --text-color-dark: #333;
    --text-color-light: #666;
    --border-light: #e0e0e0;
    --shadow-subtle: rgba(0, 0, 0, 0.08);
    --shadow-medium: rgba(0, 0, 0, 0.15);
    --success-bg: #d4edda;
    --success-text: #155724;
    --error-bg: #f8d7da;
    --error-text: #721c24;
}

body {
    font-family: 'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
    background-color: var(--background-light);
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    color: var(--text-color-dark);
}

.page-wrapper {

    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    position: relative; /* Para o posicionamento da mensagem */
    margin-top: 80px;
}

.form-card-new {
    background: var(--card-bg);
    border-radius: 16px;
    box-shadow: 0 10px 30px var(--shadow-medium);
    padding: 40px 50px;
    width: 100%;
    max-width: 900px; /* Mais largura para comportar duas colunas */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 30px; /* Espaçamento entre seções */
}

.form-header {
    text-align: center;
    margin-bottom: 20px;
}

.form-header h2 {
    color: var(--primary-color);
    font-size: 2.2rem;
    margin-bottom: 10px;
    font-weight: 700;
}

.form-header p {
    color: var(--text-color-light);
    font-size: 1.1rem;
    line-height: 1.5;
}

.vehicle-form {
    display: flex;
    flex-direction: column;
    gap: 30px;
}

.form-section {
    border: 1px solid var(--border-light);
    border-radius: 12px;
    padding: 25px;
    background-color: #fcfcfc;
}

.form-section h3 {
    color: var(--secondary-color);
    font-size: 1.4rem;
    margin-top: 0;
    margin-bottom: 20px;
    border-bottom: 2px solid var(--primary-color); /* Linha de destaque */
    padding-bottom: 10px;
    display: inline-block; /* Para a linha ter a largura do texto */
    font-weight: 600;
}

.form-group {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* 2 ou 3 colunas */
    gap: 25px; /* Espaçamento entre os campos dentro da seção */
}

.form-field-new {
    display: flex;
    flex-direction: column;
}

.form-field-new label {
    font-weight: 600;
    margin-bottom: 8px;
    color: var(--text-color-dark);
    font-size: 0.98rem;
}

.form-field-new input,
.form-field-new select {
    width: 100%;
    padding: 14px 18px;
    border: 1px solid var(--border-light);
    border-radius: 10px; /* Mais arredondado */
    font-size: 1rem;
    color: var(--text-color-dark);
    background-color: var(--white);
    transition: all 0.3s ease-in-out;
    box-sizing: border-box;
}

.form-field-new input::placeholder {
    color: #a0a0a0;
    font-style: italic;
}

.form-field-new input:focus,
.form-field-new select:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2); /* Sombra suave de foco */
    outline: none;
    background-color: #fafffa;
}

.form-field-new select:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
    color: var(--text-color-light);
}

.form-footer {
    display: flex;
    justify-content: flex-end; /* Alinhar botões à direita */
    gap: 15px; /* Espaçamento entre botões */
    margin-top: 20px;
}

.submit-button,
.clear-button {
    padding: 15px 30px;
    border: none;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px var(--shadow-subtle);
}

.submit-button {
    background-color: var(--primary-color);
    color: var(--white);
}

.submit-button:hover {
    background-color: #546E7A;
    transform: translateY(-3px);
    box-shadow: 0 6px 15px var(--shadow-medium);
}

.submit-button:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px var(--shadow-subtle);
}

.clear-button {
    background-color: var(--secondary-color);
    color: var(--white);
}

.clear-button:hover {
    background-color: #546E7A;
    transform: translateY(-3px);
    box-shadow: 0 6px 15px var(--shadow-medium);
}

.clear-button:active {
    transform: translateY(0);
    box-shadow: 0 2px 5px var(--shadow-subtle);
}

/* Estilos para a mensagem de feedback */
.app-message {
    position: fixed; /* Fixa no topo */
    top: 25px;
    left: 50%;
    transform: translateX(-50%);
    padding: 15px 25px;
    border-radius: 8px;
    font-weight: 600;
    color: var(--white); /* Cor padrão do texto da mensagem */
    z-index: 1000;
    opacity: 0;
    animation: slideInFadeOut 3.5s forwards ease-in-out;
    box-shadow: 0 4px 12px var(--shadow-medium);
    min-width: 300px;
    text-align: center;
}

.app-message.success {
    background-color: var(--success-bg);
    color: var(--success-text);
    border: 1px solid #c3e6cb;
}

.app-message.error {
    background-color: var(--error-bg);
    color: var(--error-text);
    border: 1px solid #f5c6cb;
}

@keyframes slideInFadeOut {
    0% { opacity: 0; transform: translateX(-50%) translateY(-30px); }
    10% { opacity: 1; transform: translateX(-50%) translateY(0); }
    90% { opacity: 1; transform: translateX(-50%) translateY(0); }
    100% { opacity: 0; transform: translateX(-50%) translateY(-30px); }
}

/* Responsividade */
@media (max-width: 992px) {
    .form-card-new {
        max-width: 700px; /* Reduz a largura em tablets */
        padding: 30px 40px;
    }
    .form-group {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Ajusta colunas */
    }
}

@media (max-width: 768px) {
    .form-card-new {
        max-width: 95%;
        padding: 25px;
    }
    .form-header h2 {
        font-size: 1.8rem;
    }
    .form-section {
        padding: 20px;
    }
    .form-group {
        grid-template-columns: 1fr; /* Uma coluna em telas muito pequenas */
        gap: 20px;
    }
    .form-footer {
        flex-direction: column; /* Botões empilhados */
        align-items: stretch; /* Estica os botões */
    }
    .submit-button, .clear-button {
        width: 100%;
    }
}
</style>