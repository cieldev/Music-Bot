const {
	MessageEmbed,
	MessageActionRow,
	MessageButton,
	Permissions,
} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("List all commands of bot"),

	async execute(interaction) {
		const commands = interaction.client.slashCommands;
		const client = interaction.client;

		const helpEmbed = new MessageEmbed()
			.setColor(`RED`)
			.setAuthor(
				`${interaction.user.username}`,
				`${interaction.user.avatarURL({ dynamic: true })}`,
				`https://discord.com/users/${interaction.user.id}`
			)
			.setDescription(
				`Hey there! I am ${client.user.username}, a  bot programmed by **[Ciel#1234](https://cieldev.net)** to help you with playing music.\n I support Spotify/YouTube/SoundCloud and my commands are listed below -`
			)
			.setTitle(`**${client.user.username}**`)
			.setThumbnail(client.user.avatarURL({ dynamic: true }))
			.setFooter(
				`${client.user.username.toUpperCase()} ${new Date().getFullYear()}`,
				client.user.avatarURL({ dynamic: true })
			)
			.setTimestamp();

		commands.map((command) =>
			helpEmbed.addField(
				`>>> \`/${command.data.name.toLowerCase().replace("_", "-")}\``,
				command.data.description,
				true
			)
		);
		const invite = client.generateInvite({
			permissions: [Permissions.FLAGS.ADMINISTRATOR],
			scopes: ["bot", "applications.commands"],
		});
		const kool = new MessageActionRow().addComponents(
			new MessageButton()
				.setLabel("Invite")
				.setStyle("LINK")
				.setURL(invite)
				.setEmoji("🔗"),
			new MessageButton()
				.setLabel("Documents")
				.setStyle("LINK")
				.setURL("https://mai-chan.cieldev.net")
				.setEmoji("📖"),
		);

		await interaction.editReply({
			embeds: [helpEmbed],
			components: [kool],
		});
	},
};
