import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const deviceId = req.headers.get('x-device-id') || 'default-device';
    // Self-healing database lookups: If tables don't exist yet (or aren't seeded), return client safe defaults
    let user;
    try {
      user = await prisma.userProgress.findUnique({
        where: { deviceId },
      });
      if (!user) {
        // New device gets starting bonus of 100 XP!
        user = await prisma.userProgress.create({
          data: {
            deviceId,
            username: 'Arya',
            xp: 100,
            streak: 1,
            kidsMode: false,
            currentKand: 'Bal Kand',
            language: 'English',
            lastActive: new Date(),
          },
        });
      } else {
        // Daily Login Bonus and Streak Decay Logic
        const now = new Date();
        const lastActiveDate = new Date(user.lastActive);
        
        // Reset to midnight to check strictly by calendar days
        const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const lastActiveMidnight = new Date(lastActiveDate.getFullYear(), lastActiveDate.getMonth(), lastActiveDate.getDate());
        
        const diffTime = todayMidnight.getTime() - lastActiveMidnight.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays >= 1) {
          // This is a new calendar day login!
          let newStreak = user.streak;
          if (diffDays === 1) {
            newStreak = user.streak + 1; // Consecutive day login: increment streak
          } else {
            newStreak = 1; // Missed a day: reset streak to 1
          }

          // Reward exactly 50 XP for daily login bonus!
          user = await prisma.userProgress.update({
            where: { id: user.id },
            data: {
              xp: user.xp + 50,
              streak: newStreak,
              lastActive: now,
            },
          });
        } else {
          // Same calendar day: update lastActive timestamp without awarding daily bonus XP
          user = await prisma.userProgress.update({
            where: { id: user.id },
            data: {
              lastActive: now,
            },
          });
        }
      }
    } catch (dbErr) {
      console.warn('MySQL lookup skipped or failed (Prisma schema might need pushing):', dbErr);
      return NextResponse.json({
        user: {
          username: 'Arya (Local)',
          xp: 100,
          streak: 1,
          kidsMode: false,
          currentKand: 'Bal Kand',
          language: 'English',
        },
        warning: 'MySQL connection offline or schema not pushed. Running on client-fallback.',
      });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('API User GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const deviceId = req.headers.get('x-device-id') || 'default-device';
    const body = await req.json();
    const { xp, streak, username, kidsMode, language, quizType, score, maxScore, reset } = body;

    // Handle Quiz Log write request if parameters exist
    if (quizType && score !== undefined && maxScore !== undefined) {
      try {
        const attempt = await prisma.quizAttempt.create({
          data: {
            quizType,
            score: Number(score),
            maxScore: Number(maxScore),
          },
        });
        return NextResponse.json({ success: true, quizAttempt: attempt });
      } catch (dbErr) {
        console.warn('MySQL Quiz log skipped (schema not pushed):', dbErr);
        return NextResponse.json({ success: true, warning: 'Database offline. Quiz not logged.' });
      }
    }

    // Handle User Progression update requests
    try {
      const user = await prisma.userProgress.findUnique({
        where: { deviceId },
      });
      
      if (reset) {
        if (user) {
          const resetUser = await prisma.userProgress.update({
            where: { id: user.id },
            data: {
              xp: 100, // Reset to 100 XP starting baseline
              streak: 1,
              lastActive: new Date(),
            },
          });
          return NextResponse.json({ success: true, user: resetUser });
        } else {
          const newUser = await prisma.userProgress.create({
            data: {
              deviceId,
              username: 'Arya',
              xp: 100,
              streak: 1,
              lastActive: new Date(),
            },
          });
          return NextResponse.json({ success: true, user: newUser });
        }
      }

      if (user) {
        const updatedUser = await prisma.userProgress.update({
          where: { id: user.id },
          data: {
            xp: xp !== undefined ? Number(xp) : undefined,
            streak: streak !== undefined ? Number(streak) : undefined,
            username: username !== undefined ? String(username) : undefined,
            kidsMode: kidsMode !== undefined ? Boolean(kidsMode) : undefined,
            language: language !== undefined ? String(language) : undefined,
            lastActive: new Date(),
          },
        });
        return NextResponse.json({ success: true, user: updatedUser });
      } else {
        // Fallback: Create new user progression
        const newUser = await prisma.userProgress.create({
          data: {
            deviceId,
            username: username || 'Arya',
            xp: xp !== undefined ? Number(xp) : 100,
            streak: streak !== undefined ? Number(streak) : 1,
            kidsMode: kidsMode || false,
            language: language || 'English',
            lastActive: new Date(),
          },
        });
        return NextResponse.json({ success: true, user: newUser });
      }
    } catch (dbErr) {
      console.warn('MySQL User update skipped (schema not pushed):', dbErr);
      return NextResponse.json({ success: true, warning: 'Database offline. Stats updated on client only.' });
    }
  } catch (error) {
    console.error('API User POST error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
