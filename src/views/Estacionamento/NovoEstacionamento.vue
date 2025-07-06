<script>
import DAOService from '@/service/DAOService';
import LoginService from '@/service/LoginService';
import { ref, watch } from 'vue'; // Importar 'watch' para observar mudanças nos campos

export default {
  setup() {
    const daoUsuario = new DAOService('dadosUsuario');
    const daoEstacionamento = new DAOService('dadosEstacionamento');
    const loginService = new LoginService();

    const dadosUsuario = ref({
      CPF: '',
      RG: '',
      nome: '',
      apelidio: '',
      cep: '',
      uf: '',
      bairro: '',
      cidade: '',
      endereço: '',
      numero: '',
      complemento: '',
      telefone: '',
      whatsApp: '',
      visDashboard: false,
      darDesconto: false,
      cadastrarUsuario: false,
      cadasTipoVaga: false,
      altValorVaga: false,
      financeiro: false,
      cadasVaga: false,
      carteira: false,
      idUsuario: '',
      idEstacionamento: ''
    });

    const dadosLogin = ref({
      email: '',
      senha: '',
      repetir_senha: ''
    });

    const dadosEstacionamento = ref({
      tipoPessoa: 'Fisica',
      CPF_CNPJ: '',
      RG_IE: '',
      razao_social: '',
      nome_fantasia: '',
      cep: '',
      uf: '',
      bairro: '',
      cidade: '',
      endereço: '',
      numero: '',
      complemento: '',
      email: '',
      telefone: '',
      whatsApp: ''
    });

    let estacionamentoId = ref(null);

    // --- Funções de Máscara ---

    const formatarCNPJ = (event) => {
      let value = event.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
      if (value.length > 14) {
        value = value.substring(0, 14);
      }
      value = value.replace(/^(\d{2})(\d)/, '$1.$2');
      value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
      value = value.replace(/(\d{4})(\d)/, '$1-$2');
      dadosEstacionamento.value.CPF_CNPJ = value;
    };

    const formatarCEP = (event, targetDataRef) => {
      let value = event.target.value.replace(/\D/g, ''); // Remove tudo que não é dígito
      if (value.length > 8) {
        value = value.substring(0, 8);
      }
      value = value.replace(/^(\d{5})(\d)/, '$1-$2');
      targetDataRef.value.cep = value;
    };

    // --- Watchers para aplicar a máscara no carregamento ou cola (se necessário) ---
    // Estes watchers garantem que, mesmo que o valor seja setado programaticamente (e.g., pela API), a máscara seja aplicada.
    watch(() => dadosEstacionamento.value.CPF_CNPJ, (newValue) => {
      let cleanValue = newValue.replace(/\D/g, '');
      let formattedValue = cleanValue;
      if (cleanValue.length > 14) {
        cleanValue = cleanValue.substring(0, 14);
      }
      formattedValue = formattedValue.replace(/^(\d{2})(\d)/, '$1.$2');
      formattedValue = formattedValue.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      formattedValue = formattedValue.replace(/\.(\d{3})(\d)/, '.$1/$2');
      formattedValue = formattedValue.replace(/(\d{4})(\d)/, '$1-$2');
      if (formattedValue !== newValue) {
        dadosEstacionamento.value.CPF_CNPJ = formattedValue;
      }
    });

    watch(() => dadosEstacionamento.value.cep, (newValue) => {
      let cleanValue = newValue.replace(/\D/g, '');
      let formattedValue = cleanValue;
      if (cleanValue.length > 8) {
        cleanValue = cleanValue.substring(0, 8);
      }
      formattedValue = formattedValue.replace(/^(\d{5})(\d)/, '$1-$2');
      if (formattedValue !== newValue) {
        dadosEstacionamento.value.cep = formattedValue;
      }
    });

    watch(() => dadosUsuario.value.cep, (newValue) => {
      let cleanValue = newValue.replace(/\D/g, '');
      let formattedValue = cleanValue;
      if (cleanValue.length > 8) {
        cleanValue = cleanValue.substring(0, 8);
      }
      formattedValue = formattedValue.replace(/^(\d{5})(\d)/, '$1-$2');
      if (formattedValue !== newValue) {
        dadosUsuario.value.cep = formattedValue;
      }
    });


    // --- Funções de Salvar ---

    const salvarEstacionamento = async () => {
      try {
        // Remover máscara antes de salvar no banco de dados (se necessário)
        const estacionamentoParaSalvar = { ...dadosEstacionamento.value };
        estacionamentoParaSalvar.CPF_CNPJ = estacionamentoParaSalvar.CPF_CNPJ.replace(/\D/g, '');
        estacionamentoParaSalvar.cep = estacionamentoParaSalvar.cep.replace(/\D/g, '');

        estacionamentoId.value = await daoEstacionamento.insert(estacionamentoParaSalvar);
        dadosUsuario.value.idEstacionamento = estacionamentoId.value;
        console.log('Estacionamento salvo com ID:', estacionamentoId.value);
        alert('Dados do estacionamento salvos com sucesso!');
      } catch (error) {
        console.error('Erro ao salvar estacionamento:', error);
        alert('Erro ao salvar dados do estacionamento. Verifique o console para mais detalhes.');
      }
    };

    const salvarUsuario = async () => {
      if (dadosLogin.value.senha !== dadosLogin.value.repetir_senha) {
        alert('As senhas não coincidem!');
        return;
      }

      if (!estacionamentoId.value) {
        alert('Por favor, salve os dados do estacionamento primeiro.');
        return;
      }

      // Remover máscara antes de salvar no banco de dados (se necessário)
      const usuarioParaSalvar = { ...dadosUsuario.value };
      usuarioParaSalvar.CPF = usuarioParaSalvar.CPF.replace(/\D/g, ''); // Adicionei remoção de máscara para CPF também
      usuarioParaSalvar.cep = usuarioParaSalvar.cep.replace(/\D/g, '');
      usuarioParaSalvar.email = dadosLogin.value.email;
      usuarioParaSalvar.senha = dadosLogin.value.senha; // A senha idealmente deve ser hasheada antes de salvar no banco

      try {
        await daoUsuario.insert(usuarioParaSalvar);
        alert('Dados do usuário e login salvos com sucesso!');
        console.log('Dados do usuário salvos:', usuarioParaSalvar);
      } catch (error) {
        console.error('Erro ao salvar usuário:', error);
        alert('Erro ao salvar dados do usuário. Verifique o console para mais detalhes.');
      }
    };

    // --- Funções de Consulta de API ---

    const pesquisarCNPJ = async () => {
      const cnpj = dadosEstacionamento.value.CPF_CNPJ.replace(/\D/g, ''); // Garante que o CNPJ esteja limpo para a API
      if (cnpj.length !== 14) {
        alert('Por favor, digite um CNPJ válido com 14 dígitos.');
        return;
      }

      try {
        const response = await fetch(`https://www.receitaws.com.br/v1/cnpj/${cnpj}`);
        const data = await response.json();

        if (data.status === 'ERROR') {
          alert(`Erro ao consultar CNPJ: ${data.message}`);
          console.error('Erro ReceitaWS:', data.message);
          return;
        }

        // Preenche os campos mantendo a lógica de máscara via watcher
        dadosEstacionamento.value.razao_social = data.nome || '';
        dadosEstacionamento.value.nome_fantasia = data.fantasia || '';
        dadosEstacionamento.value.cep = data.cep ? data.cep.replace(/\D/g, '') : ''; // Remove máscara para o watcher aplicar
        dadosEstacionamento.value.uf = data.uf || '';
        dadosEstacionamento.value.bairro = data.bairro || '';
        dadosEstacionamento.value.cidade = data.municipio || '';
        dadosEstacionamento.value.endereço = data.logradouro || '';
        dadosEstacionamento.value.numero = data.numero || '';
        dadosEstacionamento.value.complemento = data.complemento || '';
        dadosEstacionamento.value.telefone = data.telefone || '';
        dadosEstacionamento.value.email = data.email || '';

        alert('Dados do CNPJ preenchidos com sucesso!');
      } catch (error) {
        console.error('Erro ao consultar CNPJ:', error);
        alert('Erro ao consultar CNPJ. Tente novamente mais tarde.');
      }
    };

    const pesquisarCEP = async (target) => {
      let cepToSearch = '';
      let targetDataRef = null; // Usar referência direta ao ref para que o watcher seja acionado

      if (target === 'Estacionamento') {
        cepToSearch = dadosEstacionamento.value.cep.replace(/\D/g, '');
        targetDataRef = dadosEstacionamento;
      } else if (target === 'Titular') {
        cepToSearch = dadosUsuario.value.cep.replace(/\D/g, '');
        targetDataRef = dadosUsuario;
      }

      if (cepToSearch.length !== 8) {
        alert('Por favor, digite um CEP válido com 8 dígitos.');
        return;
      }

      try {
        const response = await fetch(`https://viacep.com.br/ws/${cepToSearch}/json/`);
        const data = await response.json();

        if (data.erro) {
          alert('CEP não encontrado.');
          console.error('Erro ViaCEP:', data.erro);
          return;
        }

        targetDataRef.value.endereço = data.logradouro || '';
        targetDataRef.value.bairro = data.bairro || '';
        targetDataRef.value.cidade = data.localidade || '';
        targetDataRef.value.uf = data.uf || '';
        // ViaCEP não retorna numero ou complemento diretamente para preencher.
        // Se precisar, o usuário deve preencher manualmente ou usar outra API.

        alert('Endereço preenchido com base no CEP!');
      } catch (error) {
        console.error('Erro ao consultar CEP:', error);
        alert('Erro ao consultar CEP. Tente novamente mais tarde.');
      }
    };

    return {
      salvarEstacionamento,
      salvarUsuario,
      dadosEstacionamento,
      dadosUsuario,
      dadosLogin,
      pesquisarCNPJ,
      pesquisarCEP,
      formatarCNPJ, // Expor função de máscara para o template
      formatarCEP   // Expor função de máscara para o template
    };
  }
};
</script>

<template>
  <body>
    <h1>Novo Estacionamento</h1>
    <form @submit.prevent>
      <section class="form-section">
        <h2>Dados do Estacionamento</h2>
        <div class="form-group">
          <label for="tipoPessoaEstacionamento">TIPO DE PESSOA</label>
          <select id="tipoPessoaEstacionamento" v-model="dadosEstacionamento.tipoPessoa">
            <option value="Fisica">Física</option>
            <option value="Juridica">Jurídica</option>
          </select>
        </div>

        <div class="form-group">
          <label for="CPF_CNPJ_Estacionamento">CPF/CNPJ</label>
          <input
            id="CPF_CNPJ_Estacionamento"
            type="text"
            v-model="dadosEstacionamento.CPF_CNPJ"
            @input="formatarCNPJ"
            maxlength="18"
            placeholder="XX.XXX.XXX/XXXX-XX"
          />
          <button type="button" @click="pesquisarCNPJ">Pesquisar CNPJ</button>

          <label for="RG_IEEstacionamento">RG/IE</label>
          <input type="text" id="RG_IEEstacionamento" v-model="dadosEstacionamento.RG_IE" />
        </div>

        <div class="form-group">
          <label for="razao">RAZÃO SOCIAL</label>
          <input type="text" id="razao" v-model="dadosEstacionamento.razao_social" />
        </div>

        <div class="form-group">
          <label for="nomeFantasia">FANTASIA</label>
          <input type="text" id="nomeFantasia" v-model="dadosEstacionamento.nome_fantasia" />
        </div>

        <div class="form-group">
          <label for="CEPEstacionemento">CEP</label>
          <input
            id="CEPEstacionemento"
            type="text"
            v-model="dadosEstacionamento.cep"
            @input="formatarCEP($event, dadosEstacionamento)"
            maxlength="9"
            placeholder="XXXXX-XXX"
          />
          <button type="button" @click="pesquisarCEP('Estacionamento')">
            <img src="/src/assets/img/icons8-pesquisa-50.png" width="18" height="18" alt="lupa" />
            Pesquisar CEP
          </button>
        </div>

        <div class="form-group address-group">
          <label for="enderecoEstacionamento">ENDEREÇO</label>
          <input type="text" id="enderecoEstacionamento" v-model="dadosEstacionamento.endereço" />
          <label for="numeroEstacionamento">NÚMERO</label>
          <input type="text" id="numeroEstacionamento" v-model="dadosEstacionamento.numero" />
        </div>

        <div class="form-group">
          <label for="complementoEstacionamento">COMPLEMENTO</label>
          <input type="text" id="complementoEstacionamento" v-model="dadosEstacionamento.complemento" />
          <label for="estado_ufEstacionamento">UF</label>
          <select id="estado_ufEstacionamento" v-model="dadosEstacionamento.uf">
            <option value="PE">PE</option>
            <option value="AL">AL</option>
          </select>
        </div>

        <div class="form-group">
          <label for="bairroEstacionamento">BAIRRO</label>
          <input type="text" id="bairroEstacionamento" v-model="dadosEstacionamento.bairro" />
          <label for="cidadeEstacionamentoSelect">CIDADE</label>
          <select id="cidadeEstacionamentoSelect" v-model="dadosEstacionamento.cidade">
            <option value="PALMARES">PALMARES</option>
            <option value="AGUA PRETA">ÁGUA PRETA</option>
          </select>
        </div>

        <div class="form-group">
          <label for="emailEstacionamento">EMAIL</label>
          <input type="email" id="emailEstacionamento" v-model="dadosEstacionamento.email" />
        </div>

        <div class="form-group">
          <label for="telefoneEstacionamento">TELEFONE/CELULAR</label>
          <input type="tel" id="telefoneEstacionamento" v-model="dadosEstacionamento.telefone" />
          <label for="whatsappEstacionamento">WHATSAPP</label>
          <input type="tel" id="whatsappEstacionamento" v-model="dadosEstacionamento.whatsApp" />
        </div>

        <div class="button-group">
          <button type="button" @click="salvarEstacionamento">Salvar Estacionamento</button>
        </div>
      </section>

      <section class="form-section">
        <h2>Dados do Titular</h2>
        <div class="form-group">
          <label for="titular">TITULAR</label>
          <input type="text" id="titular" v-model="dadosUsuario.nome" />
          <label for="CPF">CPF</label>
          <input type="text" id="CPF" v-model="dadosUsuario.CPF" />
          <label for="RG">RG</label>
          <input type="text" id="RG" v-model="dadosUsuario.RG" />
        </div>

        <div class="form-group">
          <label for="nomeApelidio">APELIDO</label>
          <input type="text" id="nomeApelidio" v-model="dadosUsuario.apelidio" />
        </div>

        <div class="form-group">
          <label for="CEP">CEP</label>
          <input
            id="CEP"
            type="text"
            v-model="dadosUsuario.cep"
            @input="formatarCEP($event, dadosUsuario)"
            maxlength="9"
            placeholder="XXXXX-XXX"
          />
          <button type="button" @click="pesquisarCEP('Titular')">
            <img src="../assets/img/icons8-pesquisa-50.png" width="21" height="21" alt="lupa" />
            Pesquisar CEP
          </button>
        </div>

        <div class="form-group address-group">
          <label for="endereco">ENDEREÇO</label>
          <input type="text" id="endereco" v-model="dadosUsuario.endereço" />
          <label for="numero">NÚMERO</label>
          <input type="text" id="numero" v-model="dadosUsuario.numero" />
        </div>

        <div class="form-group">
          <label for="complemento">COMPLEMENTO</label>
          <input type="text" id="complemento" v-model="dadosUsuario.complemento" />
          <label for="estadu_uf">UF</label>
          <select id="estadu_uf" v-model="dadosUsuario.uf">
            <option value="PE">Pernambuco</option>
            <option value="AL">Alagoas</option>
          </select>
        </div>

        <div class="form-group">
          <label for="bairro">BAIRRO</label>
          <input type="text" id="bairro" v-model="dadosUsuario.bairro" />
          <label for="cidadeSelect">CIDADE</label>
          <select id="cidadeSelect" v-model="dadosUsuario.cidade">
            <option value="PALMARES">PALMARES</option>
            <option value="AGUA PRETA">ÁGUA PRETA</option>
          </select>
        </div>

        <div class="form-group">
          <label for="telefone">TELEFONE/CELULAR</label>
          <input type="tel" id="telefone" v-model="dadosUsuario.telefone" />
          <label for="whatsapp">WHATSAPP</label>
          <input type="tel" id="whatsapp" v-model="dadosUsuario.whatsApp" />
        </div>

        <div class="login-section">
          <h3>Dados de Login</h3>
          <div class="form-group">
            <label for="email">EMAIL</label>
            <input type="email" id="email" v-model="dadosLogin.email" />
          </div>
          <div class="form-group">
            <label for="senha">SENHA</label>
            <input type="password" id="senha" v-model="dadosLogin.senha" />
            <label for="repetir_senha">REPETIR SENHA</label>
            <input type="password" id="repetir_senha" v-model="dadosLogin.repetir_senha" />
          </div>
        </div>

        <div class="button-group">
          <button type="button" @click="salvarUsuario">Salvar Usuário e Login</button>
        </div>
      </section>
    </form>
  </body>
</template>

<style scoped>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f4f7f6;
  color: #333;
  margin: 20px;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
}

h2 {
  color: #34495e;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
  margin-bottom: 20px;
  text-align: center;
}

h3 {
  color: #34495e;
  margin-top: 20px;
  margin-bottom: 15px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  max-width: 900px;
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.form-section {
  border: 1px solid #ddd;
  padding: 25px;
  border-radius: 8px;
  background-color: #fafafa;
}

.form-group {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 15px;
  gap: 10px;
}

.form-group label {
  flex: 0 0 120px; /* Largura fixa para os rótulos */
  font-weight: bold;
  color: #555;
  text-align: right;
  padding-right: 15px;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="tel"],
.form-group input[type="password"],
.form-group select {
  flex: 1; /* Permite que as entradas ocupem o espaço restante */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  min-width: 150px; /* Garante que as entradas não fiquem muito pequenas */
}

.form-group button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.3s ease;
}

.form-group button:hover {
  background-color: #2980b9;
}

.form-group button img {
  vertical-align: middle;
}

.address-group input {
  flex: 2; /* Torna o campo de endereço mais largo */
}

.login-section {
  margin-top: 20px;
  border-top: 1px dashed #ccc;
  padding-top: 20px;
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: 25px;
  gap: 20px;
}

.button-group button {
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.button-group button:hover {
  background-color: #229a54;
}
</style>