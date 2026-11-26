import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

const FIREBASE_WEB_CONFIG = {
  apiKey: "AIzaSyAQV6VQl0r6K9dHhfdXY17aJ9KBoaLuL1E",
  authDomain: "jacks-next-shot.firebaseapp.com",
  projectId: "jacks-next-shot",
  storageBucket: "jacks-next-shot.firebasestorage.app",
  messagingSenderId: "277003545936",
  appId: "1:277003545936:web:ced9af433155f250cad055",
};

const COLLECTION_NAME = "account_deletion_requests";
const APP_PACKAGE = "com.braverisinc.jacksnextshot";
const APP_NAME = "Jack's Next Shot";
const DEVELOPER_NAME = "Braveris Inc.";

const app = initializeApp(FIREBASE_WEB_CONFIG);
const db = getFirestore(app);

const TEXTS = {
  en: {
    eyebrow: "Account & Data Deletion",
    title: "Delete Your Account & Cloud Data",
    subtitle:
      "Official account deletion portal for Jack's Next Shot (com.braverisinc.jacksnextshot) developed by Braveris Inc.",
    stepsHeading: "Steps to Request Account Deletion",
    stepsIntro:
      "Follow the steps below to permanently erase your Jack's Next Shot account and associated cloud data from Braveris Inc. servers:",
    step1Title: "1. Choose Deletion Scope",
    step1Body:
      "Select whether you want full deletion (Firebase Authentication account + all Firestore cloud saves) or cloud gameplay progress deletion only.",
    step2Title: "2. Submit This Online Request Form",
    step2Body:
      "Enter your Google Play Games display name (found inside the game under Settings → Account), a valid contact email, and submit the form below. Your request is written directly to our Firebase queue.",
    step3Title: "3. Verification & Deletion (7–30 Days)",
    step3Body:
      "Braveris Inc. verifies ownership of the matching player profile (usuarios/{uid}), permanently deletes your Firebase Authentication record and cloud progression within 7 business days (max 30 days), and sends confirmation to your email.",
    step4Title: "4. Local Storage & Play Games Profile",
    step4Body:
      "To clear local device saves immediately, go to Android Settings → Apps → Jack's Next Shot → Storage → Clear Data or uninstall the app. You can also erase Play Games leaderboard history via the Google Play Games app settings.",
    formHeading: "Submit Account Deletion Request",
    formDesc:
      "All requests submitted below are recorded directly in the Firebase Cloud Firestore account_deletion_requests collection for processing by Braveris Inc.",
    lblEmail: "Contact Email (for confirmation) *",
    hintEmail: "We will email confirmation once deletion is complete.",
    lblPgName: "Google Play Games Display Name *",
    hintPgName: "Shown in Settings → Account inside Jack's Next Shot (e.g., SheriffJack99).",
    lblUid: "Firebase UID or Device ID (Optional)",
    hintUid: "If known, paste your player UID or fallback ID; otherwise leave blank.",
    lblScope: "Deletion Request Scope *",
    optScopeFull: "Delete Firebase Account & All Associated Cloud Data (Recommended)",
    optScopeCloud: "Delete Cloud Gameplay Progression Data Only (Keep Account Access)",
    lblReason: "Additional Details or Google Play Order ID (Optional)",
    hintReason: "Helpful if you want us to verify a specific profile, backup, or recent purchase.",
    lblAck:
      "I confirm that I am requesting deletion of my Jack's Next Shot account data provided by Braveris Inc. and understand that deleted progression, unlocked items, and virtual Braveria Stars cannot be recovered.",
    btnSubmit: "Submit Deletion Request",
    btnSubmitting: "Sending to Firebase...",
    retentionHeading: "Data Types Deleted, Kept & Retention Periods",
    retentionIntro:
      "The table below specifies every category of data processed by Jack's Next Shot (Braveris Inc.), whether it is deleted or retained upon account deletion, and applicable retention periods:",
    thType: "Data Category & Storage",
    thAction: "Action Upon Deletion",
    thRetention: "Retention Period & Notes",
    errValidation: "Please enter a valid email address, your Play Games display name, and accept the confirmation box.",
    errGeneric:
      "Unable to save the request online right now. Please try again or email braverisinc@gmail.com with your Play Games display name.",
    successTitle: "Deletion Request Recorded in Firebase",
    successBody:
      "Your request for Jack's Next Shot (Braveris Inc.) has been saved to our processing queue. Save your reference code below. We will review and fulfill your request within 7 business days (maximum 30 days) and send confirmation to your email.",
    refCodeLabel: "Reference Code",
    docIdLabel: "Firebase Record ID",
    r1Name: "Firebase Authentication Account",
    badgeDeleted1: "Deleted",
    r1Ret: "Permanently deleted within 7 business days (max 30 days) after request verification.",
    r2Name: "Cloud Firestore Profile (usuarios/{uid})",
    badgeDeleted2: "Deleted",
    r2Ret: "Permanently deleted within 7 business days (max 30 days); not kept after account erasure.",
    r3Name: "Cloud Firestore Subcollections & Legacy Docs",
    badgeDeleted3: "Deleted",
    r3Ret: "Permanently purged together with usuarios/{uid} within 7-30 days.",
    r4Name: "Local Android Device Storage",
    badgeImmediate: "Immediate on Device",
    r4Ret: "Deleted immediately when you clear app storage in Android Settings or uninstall Jack's Next Shot.",
    r5Name: "Google Play Games Leaderboards",
    badgeGoogle: "Player / Google Controlled",
    r5Ret: "Can be erased anytime via the Google Play Games app -> Settings -> Delete Play Games account & data.",
    r6Name: "Google Play Billing Audit Records (processed_orders)",
    badgeKept: "Retained for Compliance",
    r6Ret: "Retained for up to 5 years (or longer where required by tax, accounting, anti-fraud, and Google Play chargeback compliance). Cannot be used to restore virtual items.",
    r7Name: "Deletion Request Ticket (account_deletion_requests)",
    badgeTemp: "Retained Temporarily",
    r7Ret: "Retained for up to 180 days (6 months) after fulfillment as proof of compliance, then purged.",
    r8Name: "Google AdMob Advertising Identifiers",
    badgeManaged: "Managed by Google",
    r8Ret: "Braveris Inc. stores no AdMob profiles on its servers; governable via Android Privacy Settings -> Ads.",
  },
  pt: {
    eyebrow: "Exclusão de Conta e Dados",
    title: "Solicitar Exclusão de Conta e Dados",
    subtitle:
      "Portal oficial de exclusão de conta para Jack's Next Shot (com.braverisinc.jacksnextshot), desenvolvido por Braveris Inc.",
    stepsHeading: "Passo a Passo para Solicitar a Exclusão",
    stepsIntro:
      "Siga as etapas abaixo para solicitar a remoção permanente da sua conta e dos dados em nuvem de Jack's Next Shot nos servidores da Braveris Inc.:",
    step1Title: "1. Escolha o Escopo da Exclusão",
    step1Body:
      "Selecione entre a exclusão completa (conta Firebase Authentication + todos os dados em nuvem no Firestore) ou apenas a limpeza do progresso em nuvem.",
    step2Title: "2. Envie o Formulário Abaixo",
    step2Body:
      "Informe seu nome de exibição do Google Play Games (visível no jogo em Configurações → Conta), um e-mail válido para confirmação e clique em enviar. O pedido vai direto para nossa coleção no Firebase.",
    step3Title: "3. Verificação e Exclusão (7 a 30 Dias)",
    step3Body:
      "A Braveris Inc. localiza e valida seu perfil (usuarios/{uid}), apaga permanentemente sua conta no Firebase Auth e o progresso no Firestore em até 7 dias úteis (máximo 30 dias) e envia confirmação por e-mail.",
    step4Title: "4. Dados Locais e Google Play Games",
    step4Body:
      "Para apagar o save local imediatamente no Android, acesse Configurações → Apps → Jack's Next Shot → Armazenamento → Limpar dados ou desinstale o jogo. Para apagar placares do Play Games, use as configurações do app Google Play Games.",
    formHeading: "Formulário de Solicitação de Exclusão",
    formDesc:
      "Todas as solicitações enviadas abaixo são registradas diretamente na coleção account_deletion_requests do Firebase Cloud Firestore para atendimento pela Braveris Inc.",
    lblEmail: "E-mail de Contato (para confirmação) *",
    hintEmail: "Enviaremos a confirmação assim que a exclusão for concluída.",
    lblPgName: "Nome de Exibição no Google Play Games *",
    hintPgName: "Exibido em Configurações → Conta dentro do Jack's Next Shot.",
    lblUid: "Firebase UID ou ID do Dispositivo (Opcional)",
    hintUid: "Se souber seu UID de jogador, cole aqui; caso contrário, deixe em branco.",
    lblScope: "Tipo de Solicitação *",
    optScopeFull: "Excluir Conta Firebase e Todos os Dados na Nuvem (Recomendado)",
    optScopeCloud: "Excluir Apenas Progresso e Dados de Jogo na Nuvem",
    lblReason: "Detalhes Adicionais ou ID de Pedido Google Play (Opcional)",
    hintReason: "Útil caso queira informar data aproximada de login ou número de pedido GPA.",
    lblAck:
      "Confirmo que estou solicitando a exclusão dos meus dados em Jack's Next Shot (Braveris Inc.) e compreendo que progresso, itens desbloqueados e Estrelas Braveria não poderão ser recuperados.",
    btnSubmit: "Enviar Solicitação de Exclusão",
    btnSubmitting: "Enviando ao Firebase...",
    retentionHeading: "Dados Excluídos, Mantidos e Prazos de Retenção",
    retentionIntro:
      "A tabela abaixo detalha quais categorias de dados de Jack's Next Shot (Braveris Inc.) são excluídas ou retidas após a solicitação e os respectivos prazos:",
    thType: "Categoria de Dados",
    thAction: "Ação Após Solicitação",
    thRetention: "Prazo de Retenção e Detalhes",
    errValidation: "Preencha um e-mail válido, seu nome no Google Play Games e marque a caixa de confirmação.",
    errGeneric:
      "Não foi possível enviar online agora. Tente novamente ou envie e-mail para braverisinc@gmail.com com seu nome no Play Games.",
    successTitle: "Solicitação Registrada no Firebase",
    successBody:
      "Sua solicitação referente a Jack's Next Shot (Braveris Inc.) foi gravada com sucesso na coleção Firebase. Guarde seu código de protocolo abaixo. Concluiremos em até 7 dias úteis (máximo 30 dias) com aviso no seu e-mail.",
    refCodeLabel: "Código do Protocolo",
    docIdLabel: "ID do Registro Firebase",
    r1Name: "Conta do Firebase Authentication",
    badgeDeleted1: "Excluido",
    r1Ret: "Excluido permanentemente em ate 7 dias uteis (maximo 30 dias) apos verificacao do pedido.",
    r2Name: "Perfil no Cloud Firestore (usuarios/{uid})",
    badgeDeleted2: "Excluido",
    r2Ret: "Excluido permanentemente em ate 7 dias uteis (maximo 30 dias), sem retencao posterior.",
    r3Name: "Subcolecoes e Documentos Legados",
    badgeDeleted3: "Excluido",
    r3Ret: "Apagados definitivamente junto com usuarios/{uid} em 7 a 30 dias.",
    r4Name: "Armazenamento Local no Android",
    badgeImmediate: "Imediato no Aparelho",
    r4Ret: "Apagado imediatamente ao limpar o armazenamento do app no Android ou desinstalar Jack's Next Shot.",
    r5Name: "Placares do Google Play Games",
    badgeGoogle: "Controlado pelo Google / Jogador",
    r5Ret: "Pode ser apagado a qualquer momento pelo app Google Play Games -> Configuracoes -> Excluir conta e dados do Play Games.",
    r6Name: "Registros de Auditoria de Compras (processed_orders)",
    badgeKept: "Retido por Obrigacao Legal",
    r6Ret: "Mantido por ate 5 anos (ou conforme exigido por leis fiscais, contabeis, antifraude e contestacao de chargeback do Google Play). Nao permite restaurar saldo virtual.",
    r7Name: "Protocolo da Solicitacao (account_deletion_requests)",
    badgeTemp: "Retido Temporariamente",
    r7Ret: "Mantido por ate 180 dias (6 meses) apos a conclusao como comprovante de atendimento e conformidade, depois excluido.",
    r8Name: "Identificadores de Anuncio Google AdMob",
    badgeManaged: "Gerenciado pelo Google",
    r8Ret: "A Braveris Inc. nao armazena perfis AdMob em servidor proprio; gerenciavel em Configuracoes do Android -> Privacidade -> Anuncios.",
  },
};

let currentLang = "en";

function setLanguage(lang) {
  currentLang = lang === "pt" ? "pt" : "en";
  const dict = TEXTS[currentLang];
  document.querySelectorAll("[data-del-i18n]").forEach((el) => {
    const key = el.getAttribute("data-del-i18n");
    if (key && dict[key]) {
      el.textContent = dict[key];
    }
  });
  const enBtn = document.getElementById("lang-en-btn");
  const ptBtn = document.getElementById("lang-pt-btn");
  if (enBtn) enBtn.classList.toggle("active", currentLang === "en");
  if (ptBtn) ptBtn.classList.toggle("active", currentLang === "pt");
  document.documentElement.lang = currentLang === "pt" ? "pt-BR" : "en";
}

function generateRequestCode() {
  const now = new Date();
  const y = String(now.getUTCFullYear()).slice(-2);
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  const rnd = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `JNS-DEL-${y}${m}${d}-${rnd}`;
}

function showStatus(type, htmlContent) {
  const box = document.getElementById("delete-status-box");
  if (!box) return;
  box.className = `form-status visible ${type}`;
  box.innerHTML = htmlContent;
  box.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

document.addEventListener("DOMContentLoaded", () => {
  const enBtn = document.getElementById("lang-en-btn");
  const ptBtn = document.getElementById("lang-pt-btn");
  if (enBtn) enBtn.addEventListener("click", () => setLanguage("en"));
  if (ptBtn) ptBtn.addEventListener("click", () => setLanguage("pt"));

  const form = document.getElementById("delete-account-form");
  const submitBtn = document.getElementById("btn-submit-deletion");
  if (!form || !submitBtn) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dict = TEXTS[currentLang];

    const contactEmail = String(document.getElementById("del-email").value || "").trim();
    const playGamesName = String(document.getElementById("del-pg-name").value || "").trim();
    const playerUid = String(document.getElementById("del-uid").value || "").trim();
    const deletionScope = String(document.getElementById("del-scope").value || "full_account_and_cloud_data");
    const reason = String(document.getElementById("del-reason").value || "").trim();
    const acknowledgedRetention = Boolean(document.getElementById("del-ack").checked);

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail);
    if (!emailValid || playGamesName.length < 2 || !acknowledgedRetention) {
      showStatus("error", `<strong>${escapeHtml(dict.errValidation)}</strong>`);
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = dict.btnSubmitting;

    const requestCode = generateRequestCode();
    const payload = {
      requestCode,
      appPackage: APP_PACKAGE,
      appName: APP_NAME,
      developerName: DEVELOPER_NAME,
      contactEmail: contactEmail.slice(0, 160),
      playGamesName: playGamesName.slice(0, 80),
      playerUid: playerUid.slice(0, 128),
      deletionScope:
        deletionScope === "cloud_data_only" ? "cloud_data_only" : "full_account_and_cloud_data",
      reason: reason.slice(0, 600),
      source: "github_pages_delete_account_form",
      pageUrl: String(window.location.href || "").slice(0, 300),
      locale: currentLang === "pt" ? "pt-BR" : "en",
      status: "pending",
      acknowledgedRetention: true,
      submittedAt: serverTimestamp(),
      submittedAtIso: new Date().toISOString(),
    };

    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), payload);
      form.reset();
      showStatus(
        "success",
        `<strong>${escapeHtml(dict.successTitle)}</strong>
         <p style="margin:8px 0 0;">${escapeHtml(dict.successBody)}</p>
         <div class="ticket-code-pill">${escapeHtml(dict.refCodeLabel)}: ${escapeHtml(requestCode)}<br>${escapeHtml(dict.docIdLabel)}: ${escapeHtml(docRef.id)}</div>`
      );
    } catch (err) {
      console.error("[DeleteAccount] Firestore error:", err);
      showStatus("error", `<strong>${escapeHtml(dict.errGeneric)}</strong>`);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = dict.btnSubmit;
    }
  });
});
