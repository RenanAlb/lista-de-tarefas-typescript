"use strict";
const inputTarefa = document.querySelector('#tarefa');
const buttonAddTarefa = document.querySelector('#addtarefa');
const listTarefasEl = document.querySelector('#tarefas');
;
const tarefasArray = [];
const adicionarTarefa = () => {
    if (!inputTarefa.value) {
        window.alert('Digite algo primeiro!');
        return null;
    }
    const tarefa = {
        tarefa: inputTarefa.value,
        data: new Date,
        concluida: false,
        id: tarefasArray.length
    };
    tarefasArray.push(tarefa);
    if (tarefa) {
        renderizarTarefa(tarefasArray);
    }
    inputTarefa.value = '';
};
const renderizarTarefa = (tarefasArray) => {
    listTarefasEl.innerHTML = '';
    listTarefasEl.style.display = 'block';
    const createUl = document.createElement('ul');
    console.log(tarefasArray);
    for (let i = 0; i < tarefasArray.length; i++) {
        const createLi = document.createElement('li');
        createLi.innerHTML = `
      <div>
        <strong>${tarefasArray[i].tarefa}</strong>
        <div>
          ${tarefasArray[i].concluida == false ? `<button class="concluir" id="${i}">Concluir</button>` : ''}
          <button class="deletar" id="${i}">Deletar</button>
        </div>
        ${tarefasArray[i].concluida == true ? '<span class="material-symbols-outlined">check</span>' : ''}
      </div>
    `;
        createUl.appendChild(createLi);
    }
    listTarefasEl.appendChild(createUl);
    selecionarButtonsConcluirOuDeletar();
};
const concluirTarefa = (id) => {
    console.log(id);
    tarefasArray[id].concluida = true;
    renderizarTarefa(tarefasArray);
};
const deletarTarefa = (id) => {
    console.log(tarefasArray);
    tarefasArray.splice(id, 1);
    renderizarTarefa(tarefasArray);
};
const selecionarButtonsConcluirOuDeletar = () => {
    const buttonsConcluirTarefaOuDeletar = document.querySelectorAll('#tarefas button');
    buttonsConcluirTarefaOuDeletar.forEach((button) => {
        button.addEventListener('click', () => {
            const getId = button.getAttribute('id');
            const getType = button.getAttribute('class');
            if (getId && getType) {
                const id = Number(getId);
                const type = String(getType);
                if (type == 'concluir') {
                    concluirTarefa(id);
                }
                else if (type == 'deletar') {
                    deletarTarefa(id);
                }
                else {
                    return null;
                }
            }
        });
    });
};
document.addEventListener('keypress', (e) => { if (e.key == 'Enter')
    adicionarTarefa(); });
buttonAddTarefa.addEventListener('click', adicionarTarefa);
