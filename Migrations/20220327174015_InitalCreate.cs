using Microsoft.EntityFrameworkCore.Migrations;

namespace HomeBuy.Migrations
{
    public partial class InitalCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Home",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(nullable: true),
                    Floors = table.Column<int>(nullable: false),
                    Size = table.Column<string>(nullable: true),
                    HomeAddress = table.Column<string>(nullable: true),
                    HomeCity = table.Column<string>(nullable: true),
                    HomeState = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Home", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Home");
        }
    }
}
