using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace FinalltechArt.DB.Migrations
{
    public partial class DrugIdSet : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_DrugUnits",
                table: "DrugUnits");

            migrationBuilder.DropColumn(
                name: "DrugUnitId1",
                table: "DrugUnits");

            migrationBuilder.AddColumn<int>(
                name: "DrugUnitId",
                table: "DrugUnits",
                nullable: false,
                defaultValue: 0)
                .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_DrugUnits",
                table: "DrugUnits",
                column: "DrugUnitId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_DrugUnits",
                table: "DrugUnits");

            migrationBuilder.DropColumn(
                name: "DrugUnitId",
                table: "DrugUnits");

            migrationBuilder.AddColumn<string>(
                name: "DrugUnitId1",
                table: "DrugUnits",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DrugUnits",
                table: "DrugUnits",
                column: "DrugUnitId1");
        }
    }
}
