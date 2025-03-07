const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const twilioClient = require("../utils/twilioClient");
const logger = require("../utils/logger");
require("dotenv").config();

exports.addAlumniProgram = async (req, res) => {
  try {
    logger.info({
      message: "Starting alumni program creation",
      userId: req.user?.id,
      method: req.method,
      url: req.originalUrl,
    });

    const { title, description, category } = req.validatedData;

    const existingAlumniProgram = await prisma.alumniProgram.findFirst({
      where: { title: title },
    });

    if (existingAlumniProgram) {
      logger.warn({
        message: "Duplicate alumni program title detected",
        userId: req.user?.id,
        title: title,
      });

      return res.status(400).json({
        status: "fail",
        message: "Nama judul sudah ada, silahkan masukkan judul lain.",
      });
    }

    const currentUser = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        role: {
          select: { name: true },
        },
        Profile: {
          select: {
            study_program_id: true,
            studyProgram: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!currentUser) {
      logger.error({
        message: "User not found",
        userId: req.user?.id,
      });

      return res.status(404).json({
        status: "fail",
        message: "User tidak ditemukan.",
        data: null,
      });
    }

    if (currentUser.role.name !== "alumni") {
      logger.warn({
        message: "Non-alumni user attempted to create program",
        userId: currentUser.id,
        role: currentUser.role.name,
      });

      return res.status(403).json({
        status: "fail",
        message: "Hanya alumni yang diizinkan menambahkan program alumni.",
      });
    }

    if (!currentUser.Profile) {
      logger.error({
        message: "Alumni profile not found",
        userId: currentUser.id,
      });

      return res.status(400).json({
        status: "fail",
        message: "Profile alumni tidak ditemukan.",
      });
    }

    const newAlumniProgram = await prisma.alumniProgram.create({
      data: {
        title,
        image: `${req.protocol}://${req.get(
          "host"
        )}/uploads/public/alumni-programs/${req.file.filename}`,
        description,
        category,
        author: {
          connect: { id: currentUser.id },
        },
        AlumniProgramStatus: "Menunggu_Persetujuan",
        isActive: false,
      },
      include: {
        author: {
          select: {
            username: true,
            Profile: {
              select: {
                studyProgram: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    logger.info({
      message: "Alumni program created successfully",
      programId: newAlumniProgram.id,
      userId: currentUser.id,
      title: title,
      category: category,
    });

    return res.status(201).json({
      status: "success",
      message: "Program alumni berhasil ditambahkan dan menunggu verifikasi.",
      data: {
        ...newAlumniProgram,
        authorName: newAlumniProgram.author.username,
        studyProgram: newAlumniProgram.author.Profile.studyProgram.name,
        createdAt: new Date(newAlumniProgram.createdAt).toLocaleDateString(
          "id-ID",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        ),
      },
    });
  } catch (error) {
    logger.error({
      message: "Error in alumni program creation",
      error: error.message,
      stack: error.stack,
      userId: req.user?.id,
      requestData: {
        title: req.validatedData?.title,
        category: req.validatedData?.category,
      },
    });

    console.error("Error:", error);
    return res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan pada server.",
    });
  }
};

exports.readAlumniProgram = async (req, res) => {
  try {
    // Ambil parameter `category` dari query jika ada
    const { category } = req.query;

    const AlumniPrograms = await prisma.AlumniProgram.findMany({
      where: {
        isActive: true, // Hanya program yang aktif
        AlumniProgramStatus: "Diverifikasi_Oleh_Universitas", // Hanya program yang diverifikasi universitas
        ...(category && { category }), // Filter berdasarkan kategori jika parameter `category` ada
      },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        image: true,
        createdAt: true,
        author: {
          select: {
            username: true, // Mengambil nama dari author
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Format hasil agar `author` menjadi `authorName` dan format `createdAt`
    const formattedAlumniPrograms = AlumniPrograms.map((program) => ({
      id: program.id,
      title: program.title,
      description: program.description,
      image: program.image,
      category: program.category,
      authorName: program.author.username,
      createdAt:
        new Date(program.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }) +
        " " +
        new Date(program.createdAt).toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
    }));

    return res.status(200).json({
      status: "success",
      message: "Data program alumni berhasil diambil.",
      data: formattedAlumniPrograms,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan pada server.",
    });
  }
};

exports.detailAlumniProgram = async (req, res) => {
  try {
    const id = req.params.id;

    const AlumniProgram = await prisma.AlumniProgram.findUnique({
      where: { id: id },
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!AlumniProgram) {
      return res.status(404).json({
        status: "fail",
        message: "Produk dengan ID tersebut tidak ditemukan.",
      });
    }

    // Format hasil agar `author` menjadi `authorName` dan format `createdAt`
    const formattedAlumniProgram = {
      id: AlumniProgram.id,
      title: AlumniProgram.title,
      description: AlumniProgram.description,
      image: AlumniProgram.image,
      category: AlumniProgram.category,
      authorName: AlumniProgram.author.username,
      createdAt:
        new Date(AlumniProgram.createdAt).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }) +
        " " +
        new Date(AlumniProgram.createdAt).toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
        }),
    };

    return res.status(200).json({
      status: "success",
      message: "Data produk berhasil diambil.",
      data: formattedAlumniProgram,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan pada server.",
    });
  }
};

exports.readVerifyAlumniProgram = async (req, res) => {
  try {
    // Get current user with role and profile
    const currentUser = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        role: true,
        Profile: {
          select: {
            study_program_id: true,
          },
        },
      },
    });

    if (!currentUser) {
      return res.status(404).json({
        status: "fail",
        message: "User tidak ditemukan",
      });
    }

    if (!currentUser.Profile && currentUser.role.name === "admin_prodi") {
      return res.status(400).json({
        status: "fail",
        message: "Profile admin prodi tidak ditemukan",
      });
    }

    // Set filter based on role
    let filter = {};
    const isProdiAdmin = currentUser.role.name === "admin_prodi";
    const isUniversityAdmin = currentUser.role.name === "admin_universitas";

    if (isProdiAdmin) {
      // Filter untuk admin prodi: hanya melihat submission dari prodi yang sama
      filter = {
        AND: [
          { AlumniProgramStatus: "Menunggu_Persetujuan" },
          {
            author: {
              Profile: {
                study_program_id: currentUser.Profile.study_program_id,
              },
            },
          },
        ],
      };
    } else if (isUniversityAdmin) {
      // Filter untuk admin universitas: melihat yang sudah diverifikasi prodi
      filter = { AlumniProgramStatus: "Diverifikasi_Oleh_Prodi" };
    } else {
      return res.status(403).json({
        status: "fail",
        message: "Anda tidak memiliki akses untuk melihat data ini",
      });
    }

    // Query alumni programs
    const programs = await prisma.alumniProgram.findMany({
      where: filter,
      include: {
        author: {
          select: {
            username: true,
            Profile: {
              select: {
                full_name: true,
                studyProgram: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
        adminProdi: {
          select: {
            username: true,
          },
        },
        adminUniversitas: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!programs.length) {
      return res.status(404).json({
        status: "fail",
        message: "Tidak ada program alumni yang perlu diverifikasi",
      });
    }

    // Transform response to include necessary information
    const transformedPrograms = programs.map((program) => ({
      ...program,
      authorName: program.author.username,
      authorFullName: program.author.Profile.full_name,
      studyProgram: program.author.Profile.studyProgram.name,
      createdAt: new Date(program.createdAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    }));

    return res.status(200).json({
      status: "success",
      data: transformedPrograms,
    });
  } catch (error) {
    console.error("Error fetching filtered alumni programs:", error);
    return res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan pada server",
    });
  }
};

exports.readVerifiedAlumniProgram = async (req, res) => {
  try {
    // Ambil data user yang sedang login
    const currentUser = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        role: true,
      },
    });

    if (!currentUser) {
      return res.status(404).json({
        status: "fail",
        message: "User tidak ditemukan",
      });
    }

    // Filter berdasarkan role
    let filter = {};
    const isUniversityAdmin = currentUser.role.name === "admin_universitas";

    if (isUniversityAdmin) {
      filter = { AlumniProgramStatus: "Diverifikasi_Oleh_Universitas" }; // Data sudah diverifikasi oleh admin Universitas
    } else {
      return res.status(403).json({
        status: "fail",
        message: "Anda tidak memiliki akses untuk melihat data ini",
      });
    }

    // Query data Alumni Program sesuai filter
    const programs = await prisma.alumniProgram.findMany({
      where: filter,
      include: {
        author: {
          select: {
            username: true,
          },
        },
        adminProdi: {
          select: {
            username: true,
          },
        },
        adminUniversitas: {
          select: {
            username: true,
          },
        },
      },
    });

    // Jika tidak ada data
    if (!programs.length) {
      return res.status(404).json({
        status: "fail",
        message: "Tidak ada program alumni yang sesuai filter",
      });
    }

    return res.status(200).json({
      status: "success",
      data: programs,
    });
  } catch (error) {
    console.error("Error fetching filtered alumni programs:", error);
    return res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan pada server",
    });
  }
};

exports.verifyAlumniProgram = async (req, res) => {
  try {
    const { id } = req.params;
    // const { action, rejectionReason } = req.body;
    const { action } = req.body;
    rejectionReason = "Request data anda belum memenuhi syarat";

    // Fetch the current user and their role
    const currentUser = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        role: true,
      },
    });

    if (!currentUser) {
      return res.status(404).json({
        status: "fail",
        message: "User tidak ditemukan",
      });
    }

    // Fetch the current submission
    const submission = await prisma.alumniProgram.findUnique({
      where: { id },
    });

    if (!submission) {
      return res.status(404).json({
        status: "fail",
        message: "Program alumni tidak ditemukan",
      });
    }

    // Define allowed transitions based on role and current status
    const isProdiAdmin = currentUser.role.name === "admin_prodi";
    const isUniversityAdmin = currentUser.role.name === "admin_universitas";

    // Validation for Prodi Admin
    if (isProdiAdmin) {
      if (submission.AlumniProgramStatus !== "Menunggu_Persetujuan") {
        return res.status(400).json({
          status: "fail",
          message: "Program ini sudah diverifikasi atau ditolak",
        });
      }

      if (action === "verify") {
        await prisma.alumniProgram.update({
          where: { id },
          data: {
            AlumniProgramStatus: "Diverifikasi_Oleh_Prodi",
            adminProdi: {
              connect: { id: currentUser.id },
            },
          },
        });
      } else if (action === "reject") {
        if (!rejectionReason) {
          return res.status(400).json({
            status: "fail",
            message: "Alasan penolakan harus disertakan",
          });
        }

        await prisma.alumniProgram.update({
          where: { id },
          data: {
            AlumniProgramStatus: "Ditolak",
            rejectionReason,
            adminProdi: {
              connect: { id: currentUser.id },
            },
          },
        });
      }
    }

    // Validation for University Admin
    else if (isUniversityAdmin) {
      if (submission.AlumniProgramStatus !== "Diverifikasi_Oleh_Prodi") {
        return res.status(400).json({
          status: "fail",
          message:
            "Program harus diverifikasi oleh admin prodi terlebih dahulu",
        });
      }

      if (action === "verify") {
        await prisma.alumniProgram.update({
          where: { id },
          data: {
            AlumniProgramStatus: "Diverifikasi_Oleh_Universitas",
            isActive: true,
            adminUniversitas: {
              connect: { id: currentUser.id },
            },
          },
        });
      } else if (action === "reject") {
        if (!rejectionReason) {
          return res.status(400).json({
            status: "fail",
            message: "Alasan penolakan harus disertakan",
          });
        }

        await prisma.alumniProgram.update({
          where: { id },
          data: {
            AlumniProgramStatus: "Ditolak",
            rejectionReason,
            adminUniversitas: {
              connect: { id: currentUser.id },
            },
          },
        });
      }
    } else {
      return res.status(403).json({
        status: "fail",
        message: "Anda tidak memiliki akses untuk melakukan verifikasi",
      });
    }

    // Fetch updated submission with verifier details
    const updatedSubmission = await prisma.alumniProgram.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            username: true,
          },
        },
        adminProdi: {
          select: {
            username: true,
          },
        },
        adminUniversitas: {
          select: {
            username: true,
          },
        },
      },
    });

    return res.status(200).json({
      status: "success",
      message: "Status program alumni berhasil diperbarui",
      data: updatedSubmission,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan pada server",
    });
  }
};

exports.toggleIsActiveAlumniProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    // Validasi nilai isActive
    if (typeof isActive !== "boolean") {
      return res.status(400).json({
        status: "fail",
        message: "Nilai isActive harus berupa boolean (true/false)",
      });
    }

    // Cari program alumni berdasarkan ID
    const alumniProgram = await prisma.alumniProgram.findUnique({
      where: { id },
    });

    if (!alumniProgram) {
      return res.status(404).json({
        status: "fail",
        message: "Program alumni tidak ditemukan",
      });
    }

    // Cek status verifikasi program
    if (alumniProgram.AlumniProgramStatus !== "Diverifikasi_Oleh_Universitas") {
      return res.status(400).json({
        status: "fail",
        message:
          "Hanya program yang sudah diverifikasi oleh universitas yang dapat diubah status aktifnya",
        currentStatus: alumniProgram.AlumniProgramStatus,
      });
    }

    // Perbarui status isActive jika sudah diverifikasi universitas
    const updatedAlumniProgram = await prisma.alumniProgram.update({
      where: { id },
      data: { isActive },
      select: {
        id: true,
        title: true,
        isActive: true,
        AlumniProgramStatus: true,
        author: {
          select: {
            username: true,
          },
        },
        adminUniversitas: {
          select: {
            username: true,
          },
        },
        updatedAt: true,
      },
    });

    return res.status(200).json({
      status: "success",
      message: `Status program alumni berhasil diubah menjadi ${
        isActive ? "aktif" : "nonaktif"
      }`,
      data: {
        ...updatedAlumniProgram,
        updatedAt: new Date(updatedAlumniProgram.updatedAt).toLocaleDateString(
          "id-ID",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          }
        ),
      },
    });
  } catch (error) {
    console.error("Error updating isActive:", error);
    return res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan pada server",
    });
  }
};

exports.sendAlumniProgramWhatsapp = async (req, res) => {
  try {
    logger.info({
      message: "Starting WhatsApp broadcast for Alumni Program",
      method: req.method,
      url: req.originalUrl,
      userId: req.user?.id,
    });

    const { id } = req.params;

    if (!id) {
      logger.warn({
        message: "Missing Alumni Program ID",
        userId: req.user?.id,
      });

      return res.status(400).json({
        status: "fail",
        message: "ID Program Alumni harus diisi",
      });
    }

    logger.debug({
      message: "Fetching Alumni Program details",
      programId: id,
    });

    const alumniProgram = await prisma.alumniProgram.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    if (!alumniProgram) {
      logger.warn({
        message: "Alumni Program not found",
        programId: id,
        userId: req.user?.id,
      });

      return res.status(404).json({
        status: "fail",
        message: "Program Alumni tidak ditemukan",
      });
    }

    logger.info({
      message: "Fetching alumni contact data",
      programId: id,
      programTitle: alumniProgram.title,
    });

    const sensitiveData = await prisma.sensitiveStudentData.findMany({
      where: {
        mobile_number: {
          not: null,
          not: "",
        },
      },
      select: {
        mobile_number: true,
        profile: {
          select: {
            full_name: true,
          },
        },
      },
    });

    if (!sensitiveData || sensitiveData.length === 0) {
      logger.warn({
        message: "No valid alumni phone numbers found",
        programId: id,
      });

      return res.status(404).json({
        status: "fail",
        message: "Tidak ada data alumni dengan nomor telepon yang valid",
      });
    }

    logger.info({
      message: "Starting WhatsApp broadcast",
      programId: id,
      recipientCount: sensitiveData.length,
      programTitle: alumniProgram.title,
    });

    const shortDescription =
      alumniProgram.description.length > 500
        ? `${alumniProgram.description.slice(0, 500)}...`
        : alumniProgram.description;

    const messagePromises = sensitiveData.map(async (student) => {
      const formattedPhoneNumber = formatPhoneNumber(student.mobile_number);

      if (!formattedPhoneNumber) {
        logger.warn({
          message: "Invalid phone number detected",
          studentName: student.profile.full_name,
          rawPhoneNumber: student.mobile_number,
          programId: id,
        });
        return null;
      }

      const message = `
Hai *${student.profile.full_name}*! 👋

Kami punya informasi menarik untukmu! 🌟

🎓 *Program Alumni: ${alumniProgram.title}*

📅 *Deskripsi:*  
"${shortDescription}"

📍 *Diselenggarakan oleh:* ${alumniProgram.author.username}

Jangan lewatkan kesempatan ini! Untuk detail lebih lanjut, silakan kunjungi website kami.

Salam hangat,  
Pusat Perkembangan Karier dan Alumni Yarsi
`.trim();

      try {
        logger.debug({
          message: "Attempting to send WhatsApp message",
          recipientName: student.profile.full_name,
          programId: id,
          phoneNumber: formattedPhoneNumber,
        });

        const response = await twilioClient.messages.create({
          from: process.env.TWILIO_WHATSAPP_NUMBER,
          to: `whatsapp:${formattedPhoneNumber}`,
          body: message,
        });

        logger.info({
          message: "WhatsApp message sent successfully",
          programId: id,
          recipientName: student.profile.full_name,
          messageId: response.sid,
          status: response.status,
        });

        return {
          messageSid: response.sid,
          status: response.status,
          recipientName: student.profile.full_name,
          phoneNumber: formattedPhoneNumber,
        };
      } catch (error) {
        logger.error({
          message: "Failed to send WhatsApp message",
          error: error.message,
          stack: error.stack,
          recipientName: student.profile.full_name,
          phoneNumber: formattedPhoneNumber,
          programId: id,
        });
        return null;
      }
    });

    const results = await Promise.all(messagePromises);
    const successfulMessages = results.filter((result) => result !== null);

    logger.info({
      message: "WhatsApp broadcast completed",
      programId: id,
      totalAttempted: sensitiveData.length,
      successfulCount: successfulMessages.length,
      failedCount: sensitiveData.length - successfulMessages.length,
    });

    return res.status(200).json({
      status: "success",
      message: `Pesan WhatsApp berhasil dikirim ke ${successfulMessages.length} alumni`,
      data: successfulMessages,
    });
  } catch (error) {
    logger.error({
      message: "Error in WhatsApp broadcast process",
      error: error.message,
      stack: error.stack,
      programId: req.params?.id,
      userId: req.user?.id,
    });

    return res.status(500).json({
      status: "error",
      message: "Terjadi kesalahan saat mengirim pesan WhatsApp",
      error: error.message,
    });
  }
};

function formatPhoneNumber(phoneNumber) {
  // Jika nomor dimulai dengan "08", ubah ke "+62"
  if (phoneNumber.startsWith("08")) {
    return `+62${phoneNumber.slice(1)}`;
  }
  // Jika nomor sudah dalam format internasional, kembalikan apa adanya
  if (phoneNumber.startsWith("+")) {
    return phoneNumber;
  }
  // Jika format tidak dikenal, kembalikan null (atau tangani sesuai kebutuhan)
  return phoneNumber;
}
