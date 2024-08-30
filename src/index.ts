const inputTarefa: HTMLInputElement = document.querySelector('#tarefa') as HTMLInputElement;
const buttonAddTarefa: HTMLButtonElement = document.querySelector('#addtarefa') as HTMLButtonElement;
const listTarefasEl: HTMLDivElement = document.querySelector('#tarefas') as HTMLDivElement;

interface Tarefa {
  tarefa: string
  data: Date
  concluida: boolean
  id: number
};

const tarefasArray: Tarefa[] = [];

const adicionarTarefa = (): null | undefined => {
  if (!inputTarefa.value) {
    window.alert('Digite algo primeiro!');
    return null;
  }

  const tarefa: Tarefa = {
    tarefa: inputTarefa.value,
    data: new Date,
    concluida: false,
    id: tarefasArray.length
  }

  tarefasArray.push(tarefa);

  if (tarefa) {
    renderizarTarefa(tarefasArray);
  }

  inputTarefa.value = '';
};

const renderizarTarefa = (tarefasArray: Tarefa[]): void => {
  listTarefasEl.innerHTML = '';
  listTarefasEl.style.display = 'block';

  const createUl: HTMLUListElement = document.createElement('ul') as HTMLUListElement;

  console.log(tarefasArray)

  for (let i = 0; i < tarefasArray.length; i++) {
    const createLi: HTMLLIElement = document.createElement('li') as HTMLLIElement;
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

const concluirTarefa = (id: number): void => {
  console.log(id);
  tarefasArray[id].concluida = true;
  renderizarTarefa(tarefasArray);
}

const deletarTarefa = (id: number): void => {
  console.log(tarefasArray)
  tarefasArray.splice(id, 1);
  renderizarTarefa(tarefasArray);
};

const selecionarButtonsConcluirOuDeletar = (): void => {
  const buttonsConcluirTarefaOuDeletar: NodeListOf<HTMLButtonElement> = document.querySelectorAll('#tarefas button');

  buttonsConcluirTarefaOuDeletar.forEach((button) => {
    button.addEventListener('click', () => {
      const getId: string | null = button.getAttribute('id');
      const getType: string | null = button.getAttribute('class');

      if (getId && getType) {
        const id: number = Number(getId);
        const type: string = String(getType);

        if (type == 'concluir') {
          concluirTarefa(id);
        } else if (type == 'deletar') {
          deletarTarefa(id)
        } else {
          return null;
        }
      }
    });
  });
}

document.addEventListener('keypress', (e): void => { if (e.key == 'Enter') adicionarTarefa() })
buttonAddTarefa.addEventListener('click', adicionarTarefa);