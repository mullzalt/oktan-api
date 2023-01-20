'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cbts', [
      {"id":"030f592e-c2a1-4221-8dcf-a2a82fa7aed2","title":"Test 2","startDate":"2023-01-20 00:00:00","endDate":"2023-01-20 07:00:00","duration":"60","optionCount":"10","onCorrectPoint":"3","onNullPoint":"0","onWrongPoint":"-1","imgUrl":"","archived":"1","createdAt":"2023-01-17 12:30:18","updatedAt":"2023-01-19 11:45:40"},
      {"id":"2e2a23a1-89e4-4ab7-8d7d-13ba4b1e0c58","title":"Kontolll","startDate":"2023-01-16 20:56:00","endDate":"2023-01-16 20:56:00","duration":"60","optionCount":"5","onCorrectPoint":"3","onNullPoint":"0","onWrongPoint":"-1","imgUrl":"http:\/\/localhost:8000\/public\/uploads\/cbt\/2e2a23a1-89e4-4ab7-8d7d-13ba4b1e0c58\/cbt_cover.png_1673945837798.png","archived":"1","createdAt":"2023-01-17 08:57:05","updatedAt":"2023-01-17 08:59:36"},
      {"id":"c56990dd-d30f-4ce5-80fb-aa09989f459b","title":"Test 2","startDate":"2011-11-11 00:00:00","endDate":"2011-11-11 00:00:00","duration":"60","optionCount":"10","onCorrectPoint":"3","onNullPoint":"0","onWrongPoint":"-1","imgUrl":"http:\/\/localhost:8000\/public\/uploads\/cbt\/c56990dd-d30f-4ce5-80fb-aa09989f459b\/asdfasdfklm.png_1674008408757.png","archived":"1","createdAt":"2023-01-18 02:20:08","updatedAt":"2023-01-18 02:20:08"},
      {"id":"fc6ad3ec-a846-4b5b-97c7-3f78aeaf9f2c","title":"Test 2","startDate":"2011-11-11 00:00:00","endDate":"2011-11-11 00:00:00","duration":"60","optionCount":"10","onCorrectPoint":"3","onNullPoint":"0","onWrongPoint":"-1","imgUrl":null,"archived":"1","createdAt":"2023-01-17 12:26:05","updatedAt":"2023-01-17 12:26:05"}
      ])

    await queryInterface.bulkInsert('cbt_questions', [
      {"id":"26","question":"<p>Pertanyaan ini adalah Hiring Sanbercode<strong> dasdasd<\/strong><\/p>\r\n","imgUrl":"http:\/\/localhost:8000\/public\/uploads\/cbt\/030f592e-c2a1-4221-8dcf-a2a82fa7aed2\/Screenshot%202022-06-09%20223726.png_1674095090616.png","cbtId":"030f592e-c2a1-4221-8dcf-a2a82fa7aed2","createdBy":"cfb9b864-c33b-4c41-a91e-072103c85d14","createdAt":"2023-01-19 02:24:50","updatedAt":"2023-01-19 11:43:56"},
      {"id":"28","question":"<p><\/p>\r\n","imgUrl":"http:\/\/localhost:8000\/public\/uploads\/cbt\/030f592e-c2a1-4221-8dcf-a2a82fa7aed2\/logo-crystal.3c2436b0065d6b20c597%20gagal.png_1674108738745.png","cbtId":"030f592e-c2a1-4221-8dcf-a2a82fa7aed2","createdBy":"cfb9b864-c33b-4c41-a91e-072103c85d14","createdAt":"2023-01-19 06:12:18","updatedAt":"2023-01-19 06:12:18"},
      {"id":"31","question":"<p>1<\/p>\r\n","imgUrl":"","cbtId":"030f592e-c2a1-4221-8dcf-a2a82fa7aed2","createdBy":"cfb9b864-c33b-4c41-a91e-072103c85d14","createdAt":"2023-01-19 11:47:16","updatedAt":"2023-01-19 11:47:16"},
      {"id":"32","question":"<p>Ini question nomor 6<\/p>\r\n","imgUrl":"","cbtId":"030f592e-c2a1-4221-8dcf-a2a82fa7aed2","createdBy":"cfb9b864-c33b-4c41-a91e-072103c85d14","createdAt":"2023-01-19 11:47:59","updatedAt":"2023-01-19 11:47:59"},
      {"id":"33","question":"<p>asdasd<\/p>\r\n","imgUrl":"","cbtId":"030f592e-c2a1-4221-8dcf-a2a82fa7aed2","createdBy":"cfb9b864-c33b-4c41-a91e-072103c85d14","createdAt":"2023-01-19 11:48:19","updatedAt":"2023-01-19 11:48:19"},
      {"id":"34","question":"<p>Is it golden hour?&nbsp;&nbsp;&nbsp;&nbsp;<\/p>\r\n","imgUrl":"","cbtId":"030f592e-c2a1-4221-8dcf-a2a82fa7aed2","createdBy":"cfb9b864-c33b-4c41-a91e-072103c85d14","createdAt":"2023-01-19 17:47:54","updatedAt":"2023-01-19 17:47:54"},
      {"id":"35","question":"Que que?","imgUrl":null,"cbtId":"2e2a23a1-89e4-4ab7-8d7d-13ba4b1e0c58","createdBy":null,"createdAt":"2023-01-19 20:26:39","updatedAt":"2023-01-19 20:26:39"},
      {"id":"36","question":"<p>Apa itu H<sub>2<\/sub>O?<\/p>\r\n","imgUrl":"","cbtId":"030f592e-c2a1-4221-8dcf-a2a82fa7aed2","createdBy":"7c6755d7-f029-4325-ba5f-09a16545fcf9","createdAt":"2023-01-19 21:42:36","updatedAt":"2023-01-19 21:42:36"}
      ])

      await queryInterface.bulkInsert('cbt_question_options', [
        {"id":"58","option":"<p><\/p>\r\n","imgUrl":"http:\/\/localhost:8000\/public\/uploads\/cbt\/030f592e-c2a1-4221-8dcf-a2a82fa7aed2\/7.png_1674095091977.png","isAnswer":"0","questionId":"26","createdAt":"2023-01-19 02:24:51","updatedAt":"2023-01-19 09:50:28"},
        {"id":"59","option":"<p>EDUN MANIA SUGAR DAADDYY<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"26","createdAt":"2023-01-19 02:24:52","updatedAt":"2023-01-19 09:50:28"},
        {"id":"60","option":"<p>H<sub>2<\/sub>O adalah air meren<\/p>\r\n","imgUrl":"","isAnswer":"1","questionId":"26","createdAt":"2023-01-19 02:24:52","updatedAt":"2023-01-19 11:44:17"},
        {"id":"61","option":"<p>FUCEK<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"26","createdAt":"2023-01-19 02:24:52","updatedAt":"2023-01-19 11:43:57"},
        {"id":"62","option":"<p>EWE<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"26","createdAt":"2023-01-19 02:24:52","updatedAt":"2023-01-19 10:36:45"},
        {"id":"68","option":"<p>ASDASDASDAS<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"28","createdAt":"2023-01-19 06:12:20","updatedAt":"2023-01-19 06:12:20"},
        {"id":"69","option":"<p>ASDAsasdAsd<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"28","createdAt":"2023-01-19 06:12:20","updatedAt":"2023-01-19 06:12:20"},
        {"id":"70","option":"<p>SDAAsdasAsd<\/p>\r\n","imgUrl":"","isAnswer":"1","questionId":"28","createdAt":"2023-01-19 06:12:20","updatedAt":"2023-01-19 06:12:20"},
        {"id":"71","option":"<p>ASDasdasd<\/p>\r\n","imgUrl":"","isAnswer":"1","questionId":"28","createdAt":"2023-01-19 06:12:20","updatedAt":"2023-01-19 06:12:20"},
        {"id":"72","option":"<p>ASDASD<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"28","createdAt":"2023-01-19 06:12:20","updatedAt":"2023-01-19 06:12:20"},
        {"id":"83","option":"<p>1<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"31","createdAt":"2023-01-19 11:47:17","updatedAt":"2023-01-19 11:47:17"},
        {"id":"84","option":"<p>1<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"31","createdAt":"2023-01-19 11:47:17","updatedAt":"2023-01-19 11:47:17"},
        {"id":"85","option":"<p>1<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"31","createdAt":"2023-01-19 11:47:17","updatedAt":"2023-01-19 11:47:17"},
        {"id":"86","option":"<p>1<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"31","createdAt":"2023-01-19 11:47:17","updatedAt":"2023-01-19 11:47:17"},
        {"id":"87","option":"<p>1<\/p>\r\n","imgUrl":"","isAnswer":"1","questionId":"31","createdAt":"2023-01-19 11:47:17","updatedAt":"2023-01-19 11:47:17"},
        {"id":"88","option":"<p>123<\/p>\r\n","imgUrl":"","isAnswer":"1","questionId":"32","createdAt":"2023-01-19 11:48:00","updatedAt":"2023-01-19 11:48:00"},
        {"id":"89","option":"<p>333<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"32","createdAt":"2023-01-19 11:48:00","updatedAt":"2023-01-19 11:48:00"},
        {"id":"90","option":"<p>3333<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"32","createdAt":"2023-01-19 11:48:00","updatedAt":"2023-01-19 11:48:00"},
        {"id":"91","option":"<p>333<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"32","createdAt":"2023-01-19 11:48:00","updatedAt":"2023-01-19 11:48:00"},
        {"id":"92","option":"<p>333<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"32","createdAt":"2023-01-19 11:48:00","updatedAt":"2023-01-19 11:48:00"},
        {"id":"93","option":"<p>asdasd<\/p>\r\n","imgUrl":"","isAnswer":"1","questionId":"33","createdAt":"2023-01-19 11:48:20","updatedAt":"2023-01-19 11:48:20"},
        {"id":"94","option":"<p>asdasd<\/p>\r\n","imgUrl":"","isAnswer":"1","questionId":"33","createdAt":"2023-01-19 11:48:20","updatedAt":"2023-01-19 11:48:20"},
        {"id":"95","option":"<p>asdasd<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"33","createdAt":"2023-01-19 11:48:20","updatedAt":"2023-01-19 11:48:20"},
        {"id":"96","option":"<p>asdasd<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"33","createdAt":"2023-01-19 11:48:20","updatedAt":"2023-01-19 11:48:20"},
        {"id":"97","option":"<p>asdasd<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"33","createdAt":"2023-01-19 11:48:20","updatedAt":"2023-01-19 11:48:20"},
        {"id":"98","option":"<p>yes<\/p>\r\n","imgUrl":"","isAnswer":"1","questionId":"34","createdAt":"2023-01-19 17:47:56","updatedAt":"2023-01-19 17:47:56"},
        {"id":"99","option":"<p>no<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"34","createdAt":"2023-01-19 17:47:56","updatedAt":"2023-01-19 17:47:56"},
        {"id":"100","option":"<p>alright<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"34","createdAt":"2023-01-19 17:47:56","updatedAt":"2023-01-19 17:47:56"},
        {"id":"101","option":"<p>maybe<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"34","createdAt":"2023-01-19 17:47:56","updatedAt":"2023-01-19 17:47:56"},
        {"id":"102","option":"<p>idk<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"34","createdAt":"2023-01-19 17:47:56","updatedAt":"2023-01-19 17:47:56"},
        {"id":"103","option":"<p>H2O adalah air&nbsp;&nbsp;&nbsp;&nbsp;<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"36","createdAt":"2023-01-19 21:42:38","updatedAt":"2023-01-19 21:42:38"},
        {"id":"104","option":"<p>H2O adalah karbon dioksida<\/p>\r\n","imgUrl":"","isAnswer":"1","questionId":"36","createdAt":"2023-01-19 21:42:38","updatedAt":"2023-01-19 21:42:38"},
        {"id":"105","option":"<p>H2O adalah karbon monoksida<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"36","createdAt":"2023-01-19 21:42:38","updatedAt":"2023-01-19 21:42:38"},
        {"id":"106","option":"<p>H2O adalah senyawa&nbsp;<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"36","createdAt":"2023-01-19 21:42:38","updatedAt":"2023-01-19 21:42:38"},
        {"id":"107","option":"<p>H2O adalah udara<\/p>\r\n","imgUrl":"","isAnswer":"0","questionId":"36","createdAt":"2023-01-19 21:42:38","updatedAt":"2023-01-19 21:42:38"}
        ] )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cbts')
    await queryInterface.bulkDelete('cbt_questions')
    await queryInterface.bulkDelete('cbt_question_options')
  }
};
