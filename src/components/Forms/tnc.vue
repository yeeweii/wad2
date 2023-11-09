<template>
  <v-app>
    <v-main>
      <div class="startpage">
      <v-container fluid fill-height>
        <v-row justify="center">
          <v-col>
            <v-card class="scroll">
                <router-link class="router-link-item" :to="{ name : 'Register'}">
                <v-btn class="bg-primary my-2 mx-2"><v-icon icon="mdi-menu-left"></v-icon>Back</v-btn>
                </router-link>
                <v-card-title class="headline text-center">
                Terms and Conditions
              </v-card-title>
<v-text>
    <ol>
        <li>
            Acceptance of Terms
            <p>By registering and signing up on the Pharma-Save website, you agree to comply with and be bound by these terms and conditions. If you do not agree with these terms, please do not use the Pharma-Save website.</p>
        </li>
        <li>
            Registration
            <p>
                To use certain features of the Pharma-Save website, you may be required to register for an account. You must provide accurate and complete information during the registration process.
                <br>
                You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your Pharma-Save account. You agree to notify us immediately of any unauthorized use of your account.
            </p>
        </li>
        <li>
            Eligibility
            <p>You must be at least 18 years of age or the age of majority in your jurisdiction to register and use the Pharma-Save website. By registering, you represent and warrant that you meet this eligibility requirement.</p>
        </li>
        <li>
            User content
            <p>
                By posting or submitting any content, information, or material on the Pharma-Save website, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, distribute, and display such content on the Pharma-Save website and other affiliated platforms.
                <br>
                You are solely responsible for the content you submit and for any consequences that may result from it. You must not post or submit any content that is unlawful, offensive, or infringes upon the rights of others.
            </p>
        </li>
        <li>
            Privacy
            <p>
                Our Privacy Policy outlines how we collect, use, and protect your personal information. By registering on the Pharma-Save website, you consent to the collection and use of your information as described in the Privacy Policy.
            </p>
        </li>
        <li>
            Termination
            <p>We reserve the right to terminate or suspend your Pharma-Save account, with or without notice, for any violation of these terms and conditions or for any other reason at our sole discretion.</p>
        </li>
        <li>
            Disclaimers
            <p>
                The Pharma-Save website is provided "as is" and without any warranties, express or implied. We do not guarantee that the Pharma-Save website will be error-free or continuously available.
                <br>
                We are not responsible for any content posted by users or third parties on the Pharma-Save website. You use the Pharma-Save website at your own risk.
            </p>
        </li>
        <li>
            Limitation of Liability
            <p>To the extent permitted by law, Pharma-Save shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your use of the Pharma-Save website.</p>
        </li>
        <li>
            Changes to Terms
            <p>
                We may modify these terms and conditions at any time, and the updated terms will be effective immediately upon posting on the Pharma-Save website. Your continued use of the Pharma-Save website after any changes constitute your acceptance of the revised terms.
            </p>
        </li>
        <li>
            Governing Law
            <p>These terms and conditions are governed by the laws of Pharma-Save. Any disputes shall be subject to the exclusive jurisdiction of the courts in Pharma-Save.</p>
        </li>
        <li>
            Contact Information
            <p>If you have any questions or concerns about these terms and conditions, please contact Pharma-Save at pharmasave@gmail.com.</p>
        </li>
    </ol>
</v-text>
</v-card>
</v-col>
</v-row>
</v-container>
</div>
</v-main>
</v-app>
</template>

<script>
    
</script>


<style scoped>
/* .scroll{
    max-height: 100vh;
    overflow-y: hidden;
} */
</style>