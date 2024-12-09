<script setup>

</script>

<template>
    <link href='https://fonts.googleapis.com/css?family=Inria Sans' rel='stylesheet'>
<h3>Cadastrar Veiculo</h3>
<form action="">
    <div>
        <label for="placa">Placa</label>
        <input type="text" id="placa">

        <label for="chassi">Chassi</label>
        <input type="text" id="chassi">

        <label for="renavam">Renavam</label>
        <input type="text" id="renavam">
    </div>
    <div>
        <label for="modelo">Modelo</label>
        <select>
            <option value="corolla">Corolla</option>
        </select>
        <label for="fabricante">Fabricante</label>
        <select>
            <option value="toyota">Toyota</option>
        </select>
        <label for="ano_fabricacao">Ano de fabricação</label>
        <input type="text" id="ano_fabricacao">
    </div>
    <div>
        <label for="ano_modelo">Ano modelo</label>
        <input type="text" id="ano_modelo">
        <label for="cor">Cor</label>
        <select>
            <option value="vermelho">Vermelho</option>
            <option value="preto">Preto</option>
        </select>
        <label for="potencia">Potência</label>
        <input type="text" id="potencia">
        <label for="capacidade">Capacidade</label>
        <input type="text" id="capcaidade">
    </div>
    <div>
        <label for="horaEntrada">Entrada</label>
        <input type="datetime"  id="horaEntrada">
        <label for="horaSaida">Saida</label>
        <input type="datetime"  id="horaSaida">
        <label for="valorPagar">Valor a pagar</label>
        <input type="text" id="valorPagar">
    </div>
</form>
</template>

<style scoped>


</style>
