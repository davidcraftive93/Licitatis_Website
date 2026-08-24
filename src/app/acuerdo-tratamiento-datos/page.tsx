import type { Metadata } from "next";
import { LegalShell } from "@/components/layout/LegalShell";
import { legalContact, legalDocs, company, brand } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Acuerdo de tratamiento de datos (DPA)",
  description: "Información sobre el acuerdo de tratamiento de datos de LICITATIS.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/acuerdo-tratamiento-datos" },
};

export default function DpaPage() {
  return (
    <LegalShell
      title="Acuerdo de tratamiento de datos (DPA)"
      intro="Marco del acuerdo de encargado de tratamiento (art. 28 RGPD)."
      docMeta={legalDocs.dpa}
    >
      <h2>1. Cuándo aplica</h2>
      <p>
        Un acuerdo de tratamiento de datos (DPA) regula el tratamiento de datos personales cuando
        {company.name} (titular de la marca {brand.name}) actúa como <strong>encargado</strong> por
        cuenta de un cliente que es responsable del tratamiento. Esto es propio del uso de la{" "}
        <strong>aplicación</strong> (app.licitatis.es), no de esta web comercial.
      </p>

      <h2>2. Objeto, duración, naturaleza y finalidad</h2>
      <p>
        El encargo consiste en tratar, por cuenta y según las instrucciones del cliente, los datos
        personales que este incorpore a la aplicación para preparar y gestionar sus candidaturas a
        licitaciones públicas. El tratamiento dura lo que dure la prestación del servicio y termina
        con ella.
      </p>

      <h2>3. Datos e interesados</h2>
      <p>
        Con carácter general: datos identificativos y de contacto del personal del cliente y de las
        personas que figuren en la documentación que suba (por ejemplo, en memorias técnicas,
        certificados o poderes). El cliente es quien decide qué documentación aporta y, por tanto,
        qué categorías de datos entran en el tratamiento.
      </p>

      <h2>4. Instrucciones y confidencialidad</h2>
      <p>
        {company.name} trata los datos{" "}
        <strong>únicamente siguiendo instrucciones documentadas</strong> del cliente, incluidas las
        relativas a transferencias internacionales, salvo que se lo exija el Derecho de la Unión o
        español, en cuyo caso lo informará antes del tratamiento salvo prohibición legal. Si
        entiende que una instrucción infringe la normativa de protección de datos, lo comunicará de
        inmediato.
      </p>
      <p>
        Las personas autorizadas a tratar los datos se comprometen expresamente a la
        confidencialidad, con un deber que subsiste tras el fin de la relación.
      </p>

      <h2>5. Seguridad</h2>
      <p>
        Se aplican medidas técnicas y organizativas apropiadas al riesgo, conforme al artículo 32
        del RGPD: control de acceso por rol, cifrado en tránsito, copias de seguridad, registro de
        actividad y revisión periódica de su eficacia. Las medidas vigentes se describen en la
        página de <a href="/seguridad-y-privacidad">seguridad y privacidad</a>.
      </p>

      <h2>6. Subencargados</h2>
      <p>
        El cliente presta <strong>autorización general</strong> para recurrir a los subencargados
        publicados en la página de <a href="/subencargados">subencargados</a>. Antes de incorporar o
        sustituir alguno, se informará con antelación razonable para que el cliente pueda oponerse;
        si se opone por motivos fundados, podrá resolver el servicio sin penalización. Cada
        subencargado queda sujeto a obligaciones equivalentes a las de este acuerdo.
      </p>

      <h2>7. Transferencias internacionales</h2>
      <p>
        Si algún tratamiento implica transferir datos fuera del Espacio Económico Europeo, se hará
        al amparo de una decisión de adecuación o de garantías adecuadas —normalmente cláusulas
        contractuales tipo—, y se identificará en la lista de subencargados.
      </p>

      <h2>8. Asistencia al responsable</h2>
      <p>
        {company.name} asistirá al cliente, en la medida de lo posible, para atender las solicitudes
        de ejercicio de derechos que reciba, y le prestará ayuda para cumplir sus obligaciones de
        seguridad, notificación de violaciones y evaluación de impacto (artículos 32 a 36 del RGPD).
        Si tiene conocimiento de una violación de la seguridad de los datos, se lo notificará{" "}
        <strong>sin dilación indebida</strong>, con la información de que disponga para que el
        cliente pueda cumplir sus propios deberes de notificación.
      </p>

      <h2>9. Devolución o supresión al terminar</h2>
      <p>
        Terminada la prestación, y a elección del cliente, los datos se devolverán o se suprimirán,
        junto con las copias existentes, en un plazo de <strong>30 días</strong>, salvo que el
        Derecho de la Unión o español obligue a conservarlos; en ese caso se bloquearán mientras
        dure esa obligación.
      </p>

      <h2>10. Información y auditoría</h2>
      <p>
        Se pondrá a disposición del cliente la información necesaria para demostrar el cumplimiento
        de estas obligaciones y se permitirán auditorías, incluidas inspecciones, realizadas por el
        cliente o por un auditor que designe, con preaviso razonable, en horario laboral y sin
        comprometer la confidencialidad de terceros.
      </p>

      <h2>11. Documento firmable</h2>
      <p>
        Lo anterior resume las condiciones del encargo. El documento contractual firmable, con los
        datos concretos de cada cliente, se facilita al contratar o solicitándolo a{" "}
        {legalContact.privacy}. Prevalece lo pactado y firmado entre las partes.
      </p>

      <h2>12. Relación de subencargados</h2>
      <p>
        La relación de subencargados que intervienen en el tratamiento se publica en la página de{" "}
        <a href="/subencargados">subencargados</a>.
      </p>

      <h2>13. Contacto</h2>
      <p>
        Para solicitar el DPA aplicable a la contratación del servicio, escríbenos a{" "}
        {legalContact.privacy}.
      </p>
    </LegalShell>
  );
}
