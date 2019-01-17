using Microsoft.EntityFrameworkCore.Migrations;

namespace FinalltechArt.DB.Migrations
{
    public partial class FinalltechArtDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Sault",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Sault",
                table: "Users");
        }
    }
}
