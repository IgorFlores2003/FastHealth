import React from "react";
import "./Index.css";
import Back from "../../../components/back/back";

function Politica() {
  return (
    <div>
        <Back />
    <div className="pol">
      <div className="content">
        <h1>Política de Privacidade</h1>
        <h2>1. Introdução</h2>
        <h3>
          Bem-vindo ao FastHealth. Estamos comprometidos em proteger sua
          privacidade. Esta Política de Privacidade explica como coletamos, usamos,
          divulgamos e protegemos suas informações quando você usa nossa aplicação
          de triagem hospitalar.
        </h3>
        
        <h2>2. Informações que Coletamos</h2>
        <h3>
          Coletamos vários tipos de informações de e sobre os usuários da nossa aplicação, incluindo:
          <ul>
            <li>Informações Pessoais: Nome, e-mail, CPF, e outras informações de contato que você fornece ao se cadastrar.</li>
            <li>Informações de Saúde: Informações sobre seu histórico médico e sintomas que você insere na aplicação.</li>
            <li>Informações de Localização: Usamos serviços de localização para determinar sua localização atual para fornecer informações relevantes sobre hospitais e serviços de saúde próximos.</li>
            <li>Informações de Uso: Detalhes sobre como você usa a aplicação, como data e hora de acesso, tempo de uso, e páginas visitadas.</li>
          </ul>
        </h3>

        <h2>3. Como Usamos Suas Informações</h2>
        <h3>
          Usamos as informações que coletamos para:
          <ul>
            <li>Fornecer, operar, e manter nossa aplicação.</li>
            <li>Melhorar, personalizar, e expandir nossa aplicação.</li>
            <li>Entender e analisar como você usa nossa aplicação.</li>
            <li>Desenvolver novos produtos, serviços, recursos e funcionalidades.</li>
            <li>Comunicar com você, diretamente ou através de nossos parceiros, incluindo para atendimento ao cliente, para fornecer atualizações e outras informações relacionadas à aplicação, e para fins de marketing e promocionais.</li>
            <li>Processar suas transações e gerenciar suas solicitações.</li>
            <li>Monitorar e prevenir fraudes e outras atividades ilegais.</li>
          </ul>
        </h3>

        <h2>4. Compartilhamento de Suas Informações</h2>
        <h3>
          Não compartilhamos suas informações pessoais com terceiros, exceto nas seguintes circunstâncias:
          <ul>
            <li>Com prestadores de serviços que nos auxiliam na operação da aplicação e na prestação de nossos serviços, contanto que esses prestadores de serviços estejam sujeitos a obrigações de confidencialidade.</li>
            <li>Para cumprir com qualquer obrigação legal, regulatória, processo judicial ou solicitação governamental aplicável.</li>
            <li>Para proteger nossos direitos, privacidade, segurança ou propriedade, e/ou os de nossos afiliados, você ou outros.</li>
          </ul>
        </h3>

        <h2>5. Segurança de Suas Informações</h2>
        <h3>
          Implementamos medidas de segurança para proteger suas informações pessoais contra perda, uso indevido e acesso não autorizado, divulgação, alteração ou destruição. No entanto, lembre-se de que nenhuma transmissão pela internet é totalmente segura ou livre de erros.
        </h3>

        <h2>6. Retenção de Dados</h2>
        <h3>
          Manteremos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos para os quais as coletamos, incluindo para atender a quaisquer requisitos legais, contábeis ou de relatórios.
        </h3>

        <h2>7. Seus Direitos de Privacidade</h2>
        <h3>
          Dependendo da sua localização, você pode ter os seguintes direitos em relação às suas informações pessoais:
          <ul>
            <li>Direito de acessar e obter uma cópia de suas informações pessoais.</li>
            <li>Direito de retificar qualquer informação pessoal imprecisa ou incompleta.</li>
            <li>Direito de apagar suas informações pessoais.</li>
            <li>Direito de restringir ou se opor ao processamento de suas informações pessoais.</li>
            <li>Direito à portabilidade de dados.</li>
          </ul>
        </h3>

        <h2>8. Mudanças nesta Política de Privacidade</h2>
        <h3>
          Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova Política de Privacidade nesta página. Recomendamos que você revise esta Política de Privacidade periodicamente para quaisquer alterações.
        </h3>
      </div>
    </div>
    </div>
  );
}

export default Politica;
