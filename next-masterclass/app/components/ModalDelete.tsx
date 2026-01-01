

interface Props {
    onDelete: () => void;
    onClose: () => void;
}

export default function ModalDelete( {onDelete, onClose} : Props) {
  return (
    <div className="fixed bg-black/20   inset-0 flex justify-center items-center z-50">

   <div onClick={onClose}
    className="absolute inset-0 cursor-pointer" 
     // Adicione uma função para fechar o modal aqui
  ></div>
    
    <div className="bg-white   rounded-md h-2/4 md:w-[400px] grid grid-cols-1 grid-rows-2 place-items-center z-0">
     
        <p className=" rounded-full text-red-500 text text-center bg-slate-200">Tem certeza que deseja deletar este departamento?</p>
        
        <div className="flex flex-row items-center justify-center gap-5  w-full">

              <button onClick={onDelete} className="border text-white rounded-full  w-1/4 mb-3 p-3 cursor-pointer transition-all ease-in-out duration-200 bg-red-600 hover:text-white">SIM</button>

      <button onClick={onClose}  className="rounded-full  border w-1/4 mb-3 p-3 cursor-pointer transition-all ease-in-out duration-200 hover:bg-blue-600 hover:text-white">NÃO</button>
        </div>
    </div>
     </div>
  );
}
