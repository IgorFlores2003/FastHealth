import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // Declarar um State para o user.
  const [user, setUser] = useState();

  // No useEffect toda vez que for carregada a aplicação vai verificar o localStorage o User_Token e o users_db.
  useEffect(() => {
    const userToken = localStorage.getItem("user_token");
    const usersStorage = localStorage.getItem("users_db");

    // E Verificar se possui o token e se tem algum user.
    //Esse if é uma verificação se o usuario tem o mesmo email do que o token.
    if (userToken && userStorage) {
      const hasUser = JSON.parse(usersStorage)?.filter(
        (user) => user.email === JSON.parse(userToken).email
      );
      //Se for vou setar para o setUser o nosso usuario do banco.
      if (hasUser) setUser(hasUser[0]);
    }
  }, []);

  const signin = (email, password) => {
    //Declarar uma const como useStorage para receber os usuários do Banco.
    const usersStorage = JSON.parse(localStorage.getItem("users_db"));

    //Um filtro para analisar se já existe algum email cadastrado.
    const hasUser = usersStorage?.filter((user) => user.email === email);

    //Se tiver usuario, verificar se o usuario é o mesmo do "email" e do "password".
    if (hasUser?.length) {
      if (hasUser[0].email === email && hasUser[0].password === password) {
        //Gerar um token com o "Math.random", este token é só para eu ter um controle.
        const token = Math.random().toString(36).substring(2);
        //Setei no LocalStorage um "user_token" passando como stringfy o email e o token para converter os valores
        //e objetos denotados em uma String JSON.
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        //Setando para o user o "email" e o "password"
        setUser({ email, password });
        return;
        //Caso não tenha o "email" nem o "password" irei retornar como "Email ou senha incorretos"
      } else {
        return "E-mail ou senha incorretos";
      }
      //Caso não tenha nenhum usuário retorno como "Usuário não encontrado"
    } else {
      return "Usuário não cadastrado";
    }
  };

  //function de cadastro.
  //Vou receber um "email" e uma "password"
  const singup = (email, password) => {
    //Declarar uma const como useStorage para receber os usuários do Banco.
    const userStorage = JSON.parse(localStorage.getItem("user_db"));

    //Um filtro para analisar se já existe algum email igual cadastrado.
    const hasUser = usersStorage?.filter((user) => user.email === email);

    //Caso o e email já tenha sido cadastrado vai retornar para o usuario uma mensagem.
    if (hasUser?.length) {
      return "E-mail já cadastrado";
    }
    //Caso não tenha o Email cadastrado vai dar um let newUser.
    let newUser;

    //Caso já tenha usuários no banco ele vai concatenar para inserir um novo item.
    if (usersStorage) {
      //Pega todos os usuarios e insere um novo.
      newUser = [...usersStorage, { email, password }];

      //Caso seja o primeiro ele vai dar um newUser e passar o email e a password.
    } else {
      newUser = [{ email, password }];
    }
    //Após isso setamos no users_db o novo usuario.
    localStorage.setItem("users_db", JSON.stringify(newUser));

    return;
  };

  //Function para deslogar, ele seta o user para null e remove o token no localStorage.
  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  //Rotornar os valores para conseguir utilizar em qualquer local da aplicação.
  return (
    <AuthContext.Provider
      //No value vai ter o signed para verificar se tem um usuario e as funções de Signin, signup e sigout.

      value={{ user, signed: !!user, signin, singup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
