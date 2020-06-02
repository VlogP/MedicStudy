using Microsoft.EntityFrameworkCore.Migrations;

namespace FinalltechArt.DB.Migrations
{
    public partial class DrugIdDelete : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "DrugUnitId",
                table: "DrugUnits",
                newName: "DrugUnitId1");

            migrationBuilder.AddColumn<int>(
                name: "Count",
                table: "DrugUnits",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Count",
                table: "DrugUnits");

            migrationBuilder.RenameColumn(
                name: "DrugUnitId1",
                table: "DrugUnits",
                newName: "DrugUnitId");
        }
    }
}
